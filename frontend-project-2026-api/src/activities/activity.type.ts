export type ActivityComment = {
  id: number;
  activityId: number;
  author: string;
  role: string;
  text: string;
  createdAt: string;
  upvotes: number;
};

export type ActivityParticipant = {
  id: number;
  activityId: number;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
};

export type ActivityDonation = {
  id: number;
  activityId: number;
  amount: number;
  createdAt: string;
};

export type Activity = {
  id: number;
  title: string;
  shortDescription: string;
  status: string;
  type: string;
  category: string;
  subcategory: string;
  date: string;
  startTime: string;
  endTime: string;
  location: {
    name: string;
    district: string;
    city: string;
    fullAddress: string;
  };
  organizer: {
    name: string;
    partner: string;
  };
  heroImage: string;
  cardImage: string;
  longDescription: string[];
  highlights: string[];
  maxParticipants: number;
};