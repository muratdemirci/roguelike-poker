import React from "react";

export interface ProfileData {
  name: string;
  title: string;
  photoUrl: string;
  address?: string;
  phone?: string;
  education?: string;
  email?: string;
  socialMedia?: SocialMediaLinks;
}

export interface SocialMediaLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
}

export interface CardData {
  id: number;
  title: string;
  imageUrl: string;
  bioText: string;
}

export interface AboutData {
  profile: ProfileData;
  cards: CardData[];
}
