export type AssociationType = {
  [key: string]: Association;
};

export type Association = {
  giver: string;
  receiver: string;
};
