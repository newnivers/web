export interface Round {
  id: string;
  time: string | null;
}

export interface WorkPeriod {
  date: Date;
  rounds: Round[];
}
