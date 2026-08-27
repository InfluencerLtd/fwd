/**
 * form-state.ts
 * ---------------------------------------------------------------------------
 * The shapes a form can be in, and what it starts as.
 *
 * These live here rather than next to the actions because a file marked
 * "use server" is only allowed to export functions. Putting a plain value in
 * one breaks the page at runtime, and it does so without the build complaining
 * first, so it is worth keeping the two kinds of thing apart.
 */

export type SignupState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export const initialSignupState: SignupState = { status: "idle" };

export type EarlyAccessState = { error: string | null };

export const initialEarlyAccessState: EarlyAccessState = { error: null };

export type ApplicationState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      /** Which specific fields were wrong, so each one can be flagged in place. */
      fieldErrors: Record<string, string>;
    };

export const initialApplicationState: ApplicationState = { status: "idle" };
