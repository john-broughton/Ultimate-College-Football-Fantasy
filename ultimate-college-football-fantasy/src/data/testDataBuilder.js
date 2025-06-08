import { Player } from "../models/playerModel";
import { Team } from "../models/teamModel";
import { TeamOwnership } from "../models/teamOwnershipModel";
import { TransactionLogEntry } from "../models/transactionLogModel";
// Optional: mock other models here later
// import { Team } from "../models/teamModel";

export function buildTestPlayers() {
  const alice = new Player("Alice", "alice@example.com", true);
  const bob = new Player("Bob", "bob@example.com", true);
  const charlie = new Player("Charlie", "charlie@example.com", false);

  // Temporary scores + balances for testing UI
  alice.score = 102;
  alice.balance = 60;

  bob.score = 88;
  bob.balance = 45;

  charlie.score = 75;
  charlie.balance = 30;

  return [alice, bob, charlie];
}

export function buildTestTeams() {
  const teams = [];

  const teamA = new Team("Georgia", "SEC", "Alice", 50);
  const teamB = new Team("Ohio State", "Big Ten", "Alice", 45);
  const teamC = new Team("Florida State", "ACC", "Bob", 60);

  teamA.addOwnership(new TeamOwnership({ teamName: "Georgia", ownerName: "Alice", acquiredWeek: 1 }));
  teamB.addOwnership(new TeamOwnership({ teamName: "Ohio State", ownerName: "Alice", acquiredWeek: 2 }));
  teamC.addOwnership(new TeamOwnership({ teamName: "Florida State", ownerName: "Bob", acquiredWeek: 1 }));

  teams.push(teamA, teamB, teamC);
  return teams;
}

export function buildTestTransactions() {
  return [
    new TransactionLogEntry({
      week: 1,
      playerName: "Alice",
      teamName: "Georgia",
      type: "Draft",
      cost: 50,
      note: "Top pick"
    }),
    new TransactionLogEntry({
      week: 2,
      playerName: "Alice",
      teamName: "Ohio State",
      type: "Trade",
      cost: 0,
      note: "From Bob"
    }),
    new TransactionLogEntry({
      week: 3,
      playerName: "Bob",
      teamName: "Florida State",
      type: "Drop",
      cost: 0
    }),
    new TransactionLogEntry({
      week: 4,
      playerName: "Alice",
      teamName: "Alabama",
      type: "FreeAgent",
      cost: 15
    })
  ];
}
