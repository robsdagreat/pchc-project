import Pic1 from '../assets/Home-bg.png';
import Pic2 from '../assets/Pallotti.png';
import Pic3 from '../assets/image-1.png';
import Pic4 from '../assets/image-3.png';
import Pic5 from '../assets/image.png';
import Pic7 from '../assets/image.png';
import Pic8 from '../assets/Home-bg.png';
import Pic9 from '../assets/Pallotti.png';

export interface GalleryDataItem {
    id: number;
    title: string;
    thumbnailUrl: string;
    fullImageUrl: string;
    category?: string;
}

const galleryData: GalleryDataItem[] = [
    {
        id: 1,
        title: 'Call of Duty Ghost',
        thumbnailUrl: Pic1,
        fullImageUrl: Pic1,
        category: 'Gaming', 
    },
    {
        id: 2,
        title: 'Kobe Bryant Dunking',
        thumbnailUrl: Pic2,
        fullImageUrl: Pic2,
        category: 'Sports-NBA',
    },
    {
        id: 3,
        title: 'Call of Duty WWII',
        thumbnailUrl: Pic3,
        fullImageUrl: Pic3,
        category: 'Gaming',
    },
    {
        id: 4,
        title: 'Amazing SpiderMan',
        thumbnailUrl: Pic4,
        fullImageUrl: Pic4,
        category: 'Movie',
    },
    {
        id: 5,
        title: 'Deadpool 2',
        thumbnailUrl: Pic5,
        fullImageUrl: Pic5,
        category: 'Movie',
    },
    {
        id: 7,
        title: 'Watch_Dogs2 DeadSec Squad',
        thumbnailUrl: Pic7,
        fullImageUrl: Pic7,
        category: 'Gaming',
    },
    {
        id: 8,
        title: 'Watch_Dogs2 Teaser',
        thumbnailUrl: Pic8,
        fullImageUrl: Pic8,
        category: 'Gaming',
    },
    {
        id: 9,
        title: 'Basketball Court',
        thumbnailUrl: Pic9,
        fullImageUrl: Pic9,
        category: 'Sports',
    },
];

export default galleryData;
