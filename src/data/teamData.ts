import { teamPhotoUrls } from "../content/mediaHub";

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  image: string;
};

export const coreTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Dr. L. Venkata Subramaniam",
    role: "CEO",
    image: teamPhotoUrls.venkat,
  },
  {
    id: 2,
    name: "Dr. Gopal Joshi",
    role: "PROGRAM DIRECTOR",
    image: teamPhotoUrls.gopaljoshi,
  },
  {
    id: 3,
    name: "Dr. Subhash Kalidindi",
    role: "SENIOR SCIENTIST",
    image: teamPhotoUrls.subhash,
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Nagalakshmaiah Kalva",
    role: "",
    image: teamPhotoUrls.nagalakshmaiah,
  },
  {
    id: 2,
    name: "Pallavi Kayala",
    role: "",
    image: teamPhotoUrls.pallavi,
  },
  {
    id: 3,
    name: "Durga Pritam",
    role: "",
    image: teamPhotoUrls.durgaPritam,
  },
  {
    id: 4,
    name: "Chandanesh Konakalla",
    role: "",
    image: teamPhotoUrls.chandanesh,
  },
  {
    id: 5,
    name: "Naseer Shaik",
    role: "",
    image: teamPhotoUrls.Naseer_Shaik,
  },
  {
    id: 6,
    name: "Rupa Banavathi",
    role: "",
    image: teamPhotoUrls.rupa,
  },
  {
    id: 7,
    name: "Soujanya Chatti",
    role: "",
    image: teamPhotoUrls.Soujanya_Chatti,
  },
  {
    id: 8,
    name: "Dr. Prasanta Kumbhakar",
    role: "",
    image: teamPhotoUrls.Prasanta_Kumbhakar,
  },
  {
    id: 9,
    name: "Mahesh Kondeti",
    role: "",
    image: teamPhotoUrls.maheshKondeti,
  },
  {
    id: 10,
    name: "Sai Bharath",
    role: "",
    image: teamPhotoUrls.saiBharath,
  },
  
  {
    id: 11,
    name: "Isha Chaudhary",
    role: "",
    image: teamPhotoUrls.ishaChoudhary,
  },
];
