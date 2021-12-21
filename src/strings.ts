import { Team } from "./enum";

export const TeamLabel: Record<Team, string> = {
  [Team.Independent]: "Independent",
  [Team.Player]: "Player",
  [Team.Confederacy]: "Confederacy",
  [Team.Rebellion]: "Rebel",
};
