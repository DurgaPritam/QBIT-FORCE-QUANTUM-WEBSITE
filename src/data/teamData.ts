import { teamPhotoUrls } from "../content/mediaHub";

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  image: string;
  linkedin?: string;
};

export const coreTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Dr. L. Venkata Subramaniam",
    role: "CEO",
    image: teamPhotoUrls.venkat,
    linkedin: "https://www.linkedin.com/in/lvsubramaniam/",
  },
  {
    id: 2,
    name: "Dr. Gopal Joshi",
    role: "PROGRAM DIRECTOR",
    image: teamPhotoUrls.gopaljoshi,
    linkedin: "https://www.linkedin.com/in/gopal-joshi-a41072357/",
  },
  {
    id: 3,
    name: "Dr. Subhash Kalidindi",
    role: "SENIOR SCIENTIST",
    image: teamPhotoUrls.subhash,
    linkedin: "https://www.linkedin.com/in/kalidindisubhash/",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Nagalakshmaiah Kalva",
    role: "",
    image: teamPhotoUrls.nagalakshmaiah,
    linkedin: "https://www.linkedin.com/in/naga-lakshmaiah-81a310422/",
  },
  {
    id: 2,
    name: "Pallavi Kayala",
    role: "",
    image: teamPhotoUrls.pallavi,
    linkedin: "https://www.linkedin.com/in/pallavi-kayala-162718253/",
  },
  {
    id: 3,
    name: "Durga Pritam",
    role: "",
    image: teamPhotoUrls.durgaPritam,
    linkedin: "https://www.linkedin.com/in/durgapritam/",
  },
  {
    id: 4,
    name: "Chandanesh Konakalla",
    role: "",
    image: teamPhotoUrls.chandanesh,
    linkedin: "https://www.linkedin.com/in/chandanesh-konakalla/",
  },
  {
    id: 5,
    name: "Naseer Shaik",
    role: "",
    image: teamPhotoUrls.Naseer_Shaik,
    linkedin: "https://www.linkedin.com/in/naseer-shaik-510109413/",
  },
  {
    id: 6,
    name: "Rupa Banavathi",
    role: "",
    image: teamPhotoUrls.rupa,
    linkedin: "https://www.linkedin.com/in/banavathi-rupa-bai/",
  },
  {
    id: 7,
    name: "Soujanya Chatti",
    role: "",
    image: teamPhotoUrls.Soujanya_Chatti,
    linkedin: "https://www.linkedin.com/in/soujanya-chatti-7aa251259/",
  },
  {
    id: 8,
    name: "Dr. Prasanta Kumbhakar",
    role: "",
    image: teamPhotoUrls.Prasanta_Kumbhakar,
    linkedin: "https://www.linkedin.com/in/prasanta-kumbhakar-63576678/",
  },
  {
    id: 9,
    name: "Mahesh Kondeti",
    role: "",
    image: teamPhotoUrls.maheshKondeti,
    linkedin: "https://www.linkedin.com/in/maheshkondeti/",
  },
  {
    id: 10,
    name: "Sai Bharath",
    role: "",
    image: teamPhotoUrls.saiBharath,
    linkedin: "https://www.linkedin.com/in/sai-bharath-markonda-patnaik-2171b1247/",
  },
  {
    id: 11,
    name: "Isha Chaudhary",
    role: "",
    image: teamPhotoUrls.ishaChoudhary,
    linkedin: "https://www.linkedin.com/in/isha-chaudhary-0a2966342/",
  },
];
