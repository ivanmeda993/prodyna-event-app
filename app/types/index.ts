import { User } from ".prisma/client";

export enum EventTypes {
  CONFERENCE = "Conference",
  WORKSHOP = "Workshop",
  TEAM_BUILDING = "Team Building",
  SPORTS = "Sports",
  ENTERTAINMENT = "Entertainment",
}

export type SafeEvent = Omit<
  Event,
  "createdAt" | "updatedAt" | "startDate" | "endDate" | "creator" | "attendees"
> & {
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
  creator: SafeUser;
  attendees: SafeUser[];
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
