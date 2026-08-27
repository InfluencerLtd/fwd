/**
 * library.ts  (server only)
 * ---------------------------------------------------------------------------
 * The members' library.
 *
 * The one thing here that is not obvious is how downloads work.
 *
 * Files live in a PRIVATE Supabase Storage bucket. Nothing in it has a public
 * web address. When a signed-in member asks to download something, the server
 * mints a signed link that works for a few minutes and then stops working.
 *
 * The alternative, a public file address, would mean anybody who was ever sent
 * one could pass it on for good, and the library would be gated in name only.
 */

import { getServiceClient } from "@/lib/supabase";

/** The private bucket. It must be created in Supabase before uploads work. */
export const LIBRARY_BUCKET = "library";

/** Long enough to click and download. Short enough to be useless if passed on. */
const SIGNED_LINK_SECONDS = 300;

export type LibraryItem = {
  id: string;
  kind: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  file_path: string | null;
  file_name: string | null;
  file_size: number | null;
  published_at: string | null;
  is_published: boolean;
  is_dummy: boolean;
};

const FIELDS =
  "id, kind, slug, title, summary, body, category, file_path, file_name, file_size, published_at, is_published, is_dummy";

/** Everything a member can see. Unpublished items never appear here. */
export async function listLibrary(): Promise<LibraryItem[] | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("content_items")
    .select(FIELDS)
    .eq("is_published", true)
    .order("published_at", { ascending: false, nullsFirst: false });

  return (data as LibraryItem[]) ?? [];
}

export async function getLibraryItem(slug: string): Promise<LibraryItem | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("content_items")
    .select(FIELDS)
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  return (data as LibraryItem) ?? null;
}

/**
 * A download link that works for a few minutes.
 *
 * Returns null if there is no file, if storage is not set up, or if the file is
 * missing, so the page can say so rather than offering a link that fails.
 */
export async function createDownloadLink(
  filePath: string,
): Promise<string | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data, error } = await supabase.storage
    .from(LIBRARY_BUCKET)
    .createSignedUrl(filePath, SIGNED_LINK_SECONDS);

  if (error || !data?.signedUrl) {
    console.error("[fwd.] Could not create a download link:", error?.message);
    return null;
  }
  return data.signedUrl;
}

/* ---- Admin -------------------------------------------------------------- */

export async function listAllLibraryItems(): Promise<LibraryItem[] | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("content_items")
    .select(FIELDS)
    .order("created_at", { ascending: false });

  return (data as LibraryItem[]) ?? [];
}

export async function saveLibraryItem(input: {
  id?: string;
  kind: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  is_published: boolean;
}): Promise<{ ok: boolean; reason?: string }> {
  const supabase = getServiceClient();
  if (!supabase) return { ok: false, reason: "not-configured" };

  const row = {
    ...input,
    // Stamped the first time it is published, so the library can be ordered by
    // when things actually went out rather than when they were typed up.
    published_at: input.is_published ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  const { error } = input.id
    ? await supabase.from("content_items").update(row).eq("id", input.id)
    : await supabase.from("content_items").insert(row);

  return error ? { ok: false, reason: error.message } : { ok: true };
}

/**
 * Attaches an already-uploaded file to an item.
 *
 * Uploading is done in the admin, straight into the private bucket. This only
 * records where it went.
 */
export async function attachFile(
  id: string,
  filePath: string,
  fileName: string,
  fileSize: number,
): Promise<boolean> {
  const supabase = getServiceClient();
  if (!supabase) return false;

  const { error } = await supabase
    .from("content_items")
    .update({
      file_path: filePath,
      file_name: fileName,
      file_size: fileSize,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  return !error;
}

export async function uploadLibraryFile(
  slug: string,
  file: File,
): Promise<{ ok: boolean; path?: string; reason?: string }> {
  const supabase = getServiceClient();
  if (!supabase) return { ok: false, reason: "not-configured" };

  // Namespaced by slug so two items cannot overwrite each other's file, and the
  // name is cleaned so nothing odd ends up in a storage path.
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-120);
  const path = `${slug}/${safeName}`;

  const { error } = await supabase.storage
    .from(LIBRARY_BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type || undefined });

  if (error) return { ok: false, reason: error.message };
  return { ok: true, path };
}
