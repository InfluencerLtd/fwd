/**
 * clubhouse.ts
 * ---------------------------------------------------------------------------
 * EVERY WORD INSIDE THE MEMBER AREA IS IN THIS FILE.
 *
 * Same rules as the public site: American English, no em dashes, and anything
 * marked DRAFT is my wording rather than approved wording.
 */

import { BRAND, BENEFITS } from "@/lib/brand";

export const SIGN_IN = {
  heading: "sign in",
  /** DRAFT. */
  intro: `${BRAND.memberArea} is for members. Enter the address the club has for you and we will send you a six digit code. There is no password to remember.`,

  emailLabel: "email address",
  emailSubmit: "send me a code",
  sending: "sending",

  codeHeading: "check your email",
  /**
   * DRAFT. Shown whether or not the address belongs to a member.
   *
   * This wording is load bearing. Telling somebody "that address is not a
   * member" would turn this form into a way of working out who is in the club,
   * which is the one thing the directory exists to protect.
   */
  codeIntro:
    "If that address belongs to a member, a six digit code is on its way. It works once and expires in ten minutes.",
  codeLabel: "six digit code",
  codeSubmit: "sign in",
  checking: "checking",
  resend: "use a different address",
  /** Somebody who is not a member needs a way out of here. */
  notAMember: "not a member yet? find out more here",

  /** Deliberately the same for a wrong code and a code that never existed. */
  wrongCode: "That code is not right, or it has expired. Check the email, or ask for a new code.",
  tooManyAttempts: "Too many tries. Ask for a new code and start again.",
  rateLimited: "That is a lot of codes in a short time. Give it an hour, or write to us.",
  notReady: "Sign in is not switched on quite yet. Please try again shortly.",
  invalidEmail: "That does not look like an email address. Please check it.",
} as const;

export const NAV = {
  /** The way back out to the public site, so no page is a dead end. */
  publicSite: "the fwd. site",
  home: "clubhouse",
  directory: "members",
  events: "events",
  library: "library",
  merch: "merch",
  newsletter: "newsletter",
  profile: "your profile",
  signOut: "sign out",
} as const;

export const HOME = {
  /** DRAFT. {name} is filled in with the member's first name. */
  greeting: "Hello {name}",
  intro: "What is coming up, and who else is in the room.",
  upcomingHeading: "next up",
  noEvents: "Nothing in the calendar just yet. You will get an email when there is.",
  directoryTeaser: "the members",
  directoryLine: "Search the room by name, company, market or group.",
} as const;

export const DIRECTORY = {
  heading: "members",
  /** DRAFT. */
  intro: "Everyone in the club. Search it, or filter it, and ask for an introduction to anyone.",
  searchLabel: "search by name, role or company",
  searchPlaceholder: "search",
  groupLabel: "group",
  marketLabel: "market",
  allGroups: "every group",
  allMarkets: "everywhere",
  empty: "Nobody matches that. Try fewer words.",
  countOne: "1 member",
  countMany: "{n} members",
} as const;

export const INTRO = {
  heading: BENEFITS.signature,
  /** DRAFT. */
  intro:
    "Tell us why you would like to meet {name} and we will make the introduction properly, with context, to both of you. This comes to the club team. It does not email them.",
  reasonLabel: "why would you like to meet?",
  reasonHint: "A sentence or two is plenty. The more specific, the better the introduction.",
  submit: "ask for an introduction",
  sending: "Sending",
  success: "Thank you. That is with the club team and we will be in touch before we introduce you.",
  required: "Please tell us why, so the introduction means something.",
  optedOut: "This member is not taking introductions at the moment.",
  error: "Something went wrong at our end. Please try again in a moment.",
} as const;

export const EVENTS = {
  heading: "events",
  dateLabel: "date",
  cityLabel: "city",
  formatLabel: "format",
  upcoming: "coming up",
  past: "already happened",
  noUpcoming: "Nothing in the calendar just yet.",
  noPast: "Nothing yet.",
  provisional: "provisional",
  rsvpGoing: "coming",
  rsvpNotGoing: "cannot make it",
  rsvpSaving: "saving",
  youAreGoing: "You are coming to this.",
  youAreNotGoing: "You have said you cannot make this one.",
  changeRsvp: "change your answer",
  attendingHeading: "who is coming",
  /** Shown to somebody looking at an invitation without being signed in. */
  signInToRsvp: "sign in to reserve your place",
  invitationNote: "You have been invited to this. Sign in to let us know if you are coming.",
  backToEvents: "all events",
} as const;

export const PROFILE = {
  heading: "your profile",
  /** DRAFT. */
  intro: "This is what other members see. You can change it whenever you like.",
  nameLabel: "full name",
  roleLabel: "role",
  companyLabel: "company",
  marketLabel: "market",
  bioLabel: "short bio",
  bioHint: "A line or two on what you are working on. This is what makes an introduction useful.",
  linkLabel: "LinkedIn or social profile",
  photoLabel: "photo",
  photoHint: "Photo uploads are not built yet. For now the club team can add one for you.",
  newsletterLabel: "send me the quarterly newsletter",
  introsLabel: "other members can ask to be introduced to me",
  contactPreferences: "contact preferences",
  save: "save changes",
  saving: "saving",
  saved: "Saved.",
  error: "Something went wrong at our end. Your changes were not saved.",
  required: "Please fill this in.",
} as const;

export const NEWSLETTER = {
  heading: "the newsletter",
  /** DRAFT. */
  intro: `${BENEFITS.newsletterName}, from Jenny. Four times a year, members only. What is actually changing in the industry.`,
  empty: "The first issue has not gone out yet. It will appear here when it does.",
  readMore: "read",
} as const;

export const LIBRARY = {
  heading: "the library",
  /** DRAFT. */
  intro:
    "Research, white papers, event recaps and briefings. Members only, and yours to use.",
  searchLabel: "search the library",
  searchPlaceholder: "search",
  kindLabel: "type",
  categoryLabel: "category",
  allKinds: "everything",
  allCategories: "every category",
  empty: "Nothing matches that. Try fewer words.",
  none: "There is nothing in the library yet. It will fill up as the club produces things.",
  countOne: "1 item",
  countMany: "{n} items",
  download: "download",
  downloadUnavailable:
    "This file is not available to download at the moment. Please let the club team know.",
  /** Explains why the link is short-lived, so nobody thinks it is broken. */
  downloadNote:
    "Download links are personal to you and stop working after a few minutes. Come back here for a fresh one.",
  back: "the library",
} as const;

export const MERCH = {
  heading: "merch",
  /**
   * DRAFT. The wording matters here: members CLAIM things, they do not buy
   * them. There is no price anywhere and nothing should read like a shop.
   */
  intro: "Club pieces, made in small runs. Yours to claim, not to buy.",
  none: "Nothing to claim at the moment. There will be.",
  closed: "Claims are closed on this one.",
  allGone: "All claimed.",
  claim: "claim this",
  claiming: "sending",
  update: "update your details",
  cancel: "cancel my claim",
  claimed: "Claimed. We will be in touch when it ships.",
  claimedStatusSent: "This is on its way to you.",
  back: "all merch",

  sizeLabel: "size",
  sizePick: "choose a size",
  recipientLabel: "name for the parcel",
  address1Label: "address",
  address2Label: "address, second line",
  cityLabel: "city",
  postcodeLabel: "postcode or ZIP",
  countryLabel: "country",
  noteLabel: "anything we should know",
  noteHint: "Delivery instructions, or a different address for a few weeks.",

  optional: "optional",
  required: "Please fill this in.",
  sizeRequired: "Please choose a size.",
  error: "Something went wrong at our end. Please try again in a moment.",
  /** Shown when the limit was reached while they were filling the form in. */
  gone: "These have all been claimed. Sorry, that one moved quickly.",

  /** Said plainly, because we are asking for somebody's home address. */
  addressNote:
    "We only use this to send you this one thing. It is not added to your profile and it is not shared with anyone outside the club team and whoever posts it.",
} as const;
