import Pic1 from '../assets/Home-bg.png';
import Pic2 from '../assets/Pallotti.png';
import Pic3 from '../assets/image-1.png';
import Pic4 from '../assets/image-3.png';
import Air from '../assets/Airport.png'
import Team from '../assets/team.png'
import Teach from '../assets/teachers.png'
import paint from '../assets/paints.png'
import social from '../assets/social.png'
import Stad from '../assets/satdium.png'
import Cool from '../assets/cooling.png'
import p1 from '../assets/pc1.jpeg'
import p2 from '../assets/pc2.jpeg'
import p3 from '../assets/pc3.jpeg'
import p4 from '../assets/pc4.jpeg'
import p5 from '../assets/pc5.jpeg'
import p6 from '../assets/pc6.jpeg'
import p7 from '../assets/pc7.jpeg'
import p8 from '../assets/pc8.jpeg'
import p9 from '../assets/pc9.jpeg'
import p10 from '../assets/pc10.jpeg'
import p11 from '../assets/pc11.jpeg'
import p12 from '../assets/pc12.jpeg'
import p13 from '../assets/pc13.jpeg'
import p14 from '../assets/pc14.jpeg'
import p15 from '../assets/pc15.jpeg'
import p16 from '../assets/pc16.jpeg'
import p17 from '../assets/pc17.jpeg'
import p18 from '../assets/pc18.jpeg'
import p19 from '../assets/pc19.jpeg'
import p20 from '../assets/pc20.jpeg'
import p21 from '../assets/pc21.jpeg'
import p22 from '../assets/pc22.jpeg'
import p23 from '../assets/pc23.jpeg'
import p24 from '../assets/pc24.jpeg'
import p25 from '../assets/pc25.jpeg'
import p26 from '../assets/pc26.jpeg'
import p27 from '../assets/pc27.jpeg'
import p28 from '../assets/pc28.jpeg'
import p29 from '../assets/pc29.jpeg'
import p30 from '../assets/pc30.jpeg'
import p31 from '../assets/pc31.jpeg'
import p32 from '../assets/pc32.jpeg'
import p33 from '../assets/pc33.jpeg'


export interface GalleryDataItem {
    id: number;
    thumbnailUrl: string;
    fullImageUrl: string;
    title?: string;
    category?: string;
}

const galleryData: GalleryDataItem[] = [
    {
        id: 1,
        thumbnailUrl: Pic1,
        fullImageUrl: Pic1,
        title: "Community Outreach",
        category: "Events"
    },
    {
        id: 2,
        thumbnailUrl: Pic2,
        fullImageUrl: Pic2,
        title: "Main Center Entrance",
        category: "Center"
    },
    {
        id: 3,
        thumbnailUrl: Pic3,
        fullImageUrl: Pic3,
        title: "Music Therapy Session",
        category: "Education"
    },
    {
        id: 4,
        thumbnailUrl: Pic4,
        fullImageUrl: Pic4,
        title: "Art Class in Progress",
        category: "Education"
    },
    {
        id: 5,
        thumbnailUrl: Air,
        fullImageUrl: Air,
        title: "Summer Trip 2024",
        category: "Events"
    },
    {
        id: 7,
        thumbnailUrl: Team,
        fullImageUrl: Team,
        title: "Our Dedicated Staff",
        category: "Team"
    },
    {
        id: 8,
        thumbnailUrl: Teach,
        fullImageUrl: Teach,
        title: "Teacher Training Day",
        category: "Team"
    },
    {
        id: 9,
        thumbnailUrl: Cool,
        fullImageUrl: Cool,
        title: "Indoor Safe Space",
        category: "Center"
    },
    {
        id: 10,
        thumbnailUrl: Stad,
        fullImageUrl: Stad,
        title: "Sports and Recreation",
        category: "Events"
    },
    {
        id: 11,
        thumbnailUrl: social,
        fullImageUrl: social,
        title: "Social Interaction Program",
        category: "Education"
    },
    {
        id: 12,
        thumbnailUrl: paint,
        fullImageUrl: paint,
        title: "Creative Painting",
        category: "Education"
    },
    {
        id: 13,
        thumbnailUrl: p1,
        fullImageUrl: p1,
        title: "Learning Materials",
        category: "Education"
    },
    {
        id: 14,
        thumbnailUrl: p2,
        fullImageUrl: p2,
        title: "Classroom Activity",
        category: "Education"
    },
    {
        id: 15,
        thumbnailUrl: p3,
        fullImageUrl: p3,
        title: "Outdoor Play Area",
        category: "Center"
    },
    {
        id: 16,
        thumbnailUrl: p4,
        fullImageUrl: p4,
        title: "Sensory Room",
        category: "Center"
    },
    {
        id: 17,
        thumbnailUrl: p5,
        fullImageUrl: p5,
        title: "Community Dinner",
        category: "Events"
    },
    {
        id: 18,
        thumbnailUrl: p6,
        fullImageUrl: p6,
        title: "Vocational Training",
        category: "Education"
    },
    {
        id: 19,
        thumbnailUrl: p7,
        fullImageUrl: p7,
        title: "Holiday Celebration",
        category: "Events"
    },
    {
        id: 20,
        thumbnailUrl: p8,
        fullImageUrl: p8,
        title: "Parent Workshop",
        category: "Events"
    },
    {
        id: 21,
        thumbnailUrl: p9,
        fullImageUrl: p9,
        title: "Volunteer Group",
        category: "Team"
    },
    {
        id: 22,
        thumbnailUrl: p10,
        fullImageUrl: p10,
        title: "Garden Project",
        category: "Activities"
    },
    {
        id: 23,
        thumbnailUrl: p11,
        fullImageUrl: p11,
        title: "Morning Routine",
        category: "Education"
    },
    {
        id: 24,
        thumbnailUrl: p12,
        fullImageUrl: p12,
        title: "Physical Therapy",
        category: "Education"
    },
    {
        id: 25,
        thumbnailUrl: p13,
        fullImageUrl: p13,
        title: "Story Time",
        category: "Education"
    },
    {
        id: 26,
        thumbnailUrl: p14,
        fullImageUrl: p14,
        title: "Field Trip Arrival",
        category: "Events"
    },
    {
        id: 27,
        thumbnailUrl: p15,
        fullImageUrl: p15,
        title: "Science Experiment",
        category: "Education"
    },
    {
        id: 28,
        thumbnailUrl: p16,
        fullImageUrl: p16,
        title: "Building Blocks",
        category: "Activities"
    },
    {
        id: 29,
        thumbnailUrl: p17,
        fullImageUrl: p17,
        title: "Local Market Visit",
        category: "Events"
    },
    {
        id: 30,
        thumbnailUrl: p18,
        fullImageUrl: p18,
        title: "Digital Learning",
        category: "Education"
    },
    {
        id: 31,
        thumbnailUrl: p19,
        fullImageUrl: p19,
        title: "Art Exhibition",
        category: "Events"
    },
    {
        id: 32,
        thumbnailUrl: p20,
        fullImageUrl: p20,
        title: "End of Year Party",
        category: "Events"
    },
    {
        id: 33,
        thumbnailUrl: p21,
        fullImageUrl: p21,
        title: "New Student Welcome",
        category: "Team"
    },
    {
        id: 34,
        thumbnailUrl: p22,
        fullImageUrl: p22,
        title: "Crafting Workshop",
        category: "Activities"
    },
    {
        id: 35,
        thumbnailUrl: p23,
        fullImageUrl: p23,
        title: "Meditation Circle",
        category: "Activities"
    },
    {
        id: 36,
        thumbnailUrl: p24,
        fullImageUrl: p24,
        title: "Soccer Match",
        category: "Activities"
    },
    {
        id: 37,
        thumbnailUrl: p25,
        fullImageUrl: p25,
        title: "Student Portraits",
        category: "Center"
    },
    {
        id: 38,
        thumbnailUrl: p26,
        fullImageUrl: p26,
        title: "Facility Renovation",
        category: "Center"
    },
    {
        id: 39,
        thumbnailUrl: p27,
        fullImageUrl: p27,
        title: "Staff Appreciation",
        category: "Team"
    },
    {
        id: 40,
        thumbnailUrl: p28,
        fullImageUrl: p28,
        title: "Library Corner",
        category: "Center"
    },
    {
        id: 41,
        thumbnailUrl: p29,
        fullImageUrl: p29,
        title: "Cooking Class",
        category: "Activities"
    },
    {
        id: 30,
        thumbnailUrl: p30,
        fullImageUrl: p30,
        title: "Outdoor Assembly",
        category: "Events"
    },
    {
        id: 43,
        thumbnailUrl: p31,
        fullImageUrl: p31,
        title: "Music Performance",
        category: "Events"
    },
    {
        id: 44,
        thumbnailUrl: p32,
        fullImageUrl: p32,
        title: "Group Photo",
        category: "Team"
    },
    {
        id: 45,
        thumbnailUrl: p33,
        fullImageUrl: p33,
        title: "Daily Reflections",
        category: "Education"
    },
];

export default galleryData