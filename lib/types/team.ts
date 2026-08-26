export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

export interface BoardMember {
  id: string;
  name: string;
  role: string;
  organization: string;
  photoUrl?: string;
}
