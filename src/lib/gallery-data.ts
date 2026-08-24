import akil36 from "@/assets/gallery/akil36.jpeg.asset.json";
import akil45 from "@/assets/gallery/akil45.jpeg.asset.json";
import photo1 from "@/assets/gallery/photo-1.jpeg.asset.json";
import photo2 from "@/assets/gallery/photo-2.jpeg.asset.json";
import photo3 from "@/assets/gallery/photo-3.jpeg.asset.json";
import photo4 from "@/assets/gallery/photo-4.jpeg.asset.json";
import photo5 from "@/assets/gallery/photo-5.jpeg.asset.json";
import photo6 from "@/assets/gallery/photo-6.jpeg.asset.json";
import photo7 from "@/assets/gallery/photo-7.jpeg.asset.json";
import photo8 from "@/assets/gallery/photo-8.jpeg.asset.json";
import photo9 from "@/assets/gallery/photo-9.jpeg.asset.json";
import photo10 from "@/assets/gallery/photo-10.jpeg.asset.json";
import photo11 from "@/assets/gallery/photo-11.jpeg.asset.json";
import photo12 from "@/assets/gallery/photo-12.jpeg.asset.json";
import photo13 from "@/assets/gallery/photo-13.jpeg.asset.json";
import photo14 from "@/assets/gallery/photo-14.jpeg.asset.json";
import photo15 from "@/assets/gallery/photo-15.jpeg.asset.json";
import photo16 from "@/assets/gallery/photo-16.jpeg.asset.json";
import photo17 from "@/assets/gallery/photo-17.jpeg.asset.json";
import photo18 from "@/assets/gallery/photo-18.jpeg.asset.json";
import photo19 from "@/assets/gallery/photo-19.jpeg.asset.json";
import photo20 from "@/assets/gallery/photo-20.jpeg.asset.json";
import photo21 from "@/assets/gallery/photo-21.jpeg.asset.json";
import photo22 from "@/assets/gallery/photo-22.jpeg.asset.json";
import photo23 from "@/assets/gallery/photo-23.jpeg.asset.json";
import photo24 from "@/assets/gallery/photo-24.jpeg.asset.json";
import photo25 from "@/assets/gallery/photo-25.jpeg.asset.json";
import photo26 from "@/assets/gallery/photo-26.jpeg.asset.json";
import photo27 from "@/assets/gallery/photo-27.jpeg.asset.json";
import photo28 from "@/assets/gallery/photo-28.jpeg.asset.json";
import photo29 from "@/assets/gallery/photo-29.jpeg.asset.json";
import photo30 from "@/assets/gallery/photo-30.jpeg.asset.json";
import photo31 from "@/assets/gallery/photo-31.jpeg.asset.json";
import photo32 from "@/assets/gallery/photo-32.jpeg.asset.json";
import photo33 from "@/assets/gallery/photo-33.jpeg.asset.json";
import photo34 from "@/assets/gallery/photo-34.jpeg.asset.json";
import photo35 from "@/assets/gallery/photo-35.jpeg.asset.json";
import photo36 from "@/assets/gallery/photo-36.jpeg.asset.json";
import photo37 from "@/assets/gallery/photo-37.jpeg.asset.json";
import photo38 from "@/assets/gallery/photo-38.jpeg.asset.json";
import photo39 from "@/assets/gallery/photo-39.jpeg.asset.json";
import photo40 from "@/assets/gallery/photo-40.jpeg.asset.json";

import video1 from "@/assets/gallery/video-1.mp4.asset.json";
import video2 from "@/assets/gallery/video-2.mp4.asset.json";
import video3 from "@/assets/gallery/video-3.mp4.asset.json";
import video4 from "@/assets/gallery/video-4.mp4.asset.json";
import video5 from "@/assets/gallery/video-5.mp4.asset.json";
import video6 from "@/assets/gallery/video-6.mp4.asset.json";
import video7 from "@/assets/gallery/video-7.mp4.asset.json";
import video8 from "@/assets/gallery/video-8.mp4.asset.json";
import video9 from "@/assets/gallery/video-9.mp4.asset.json";
import video10 from "@/assets/gallery/video-10.mp4.asset.json";

export type GalleryCard = {
  id: string;
  kind: "photo" | "video";
  shayari: string;
  url: string | null;
  filename: string;
};

const PHOTO_URLS: string[] = [
  akil36.url,
  akil45.url,
  photo1.url,
  photo2.url,
  photo3.url,
  photo4.url,
  photo5.url,
  photo6.url,
  photo7.url,
  photo8.url,
  photo9.url,
  photo10.url,
  photo11.url,
  photo12.url,
  photo13.url,
  photo14.url,
  photo15.url,
  photo16.url,
  photo17.url,
  photo18.url,
  photo19.url,
  photo20.url,
  photo21.url,
  photo22.url,
  photo23.url,
  photo24.url,
  photo25.url,
  photo26.url,
  photo27.url,
  photo28.url,
  photo29.url,
  photo30.url,
  photo31.url,
  photo32.url,
  photo33.url,
  photo34.url,
  photo35.url,
  photo36.url,
  photo37.url,
  photo38.url,
  photo39.url,
  photo40.url,
];

const PHOTO_SHAYARI = [
  "Aapki muskaan me hi hamari duaon ka noor hai. 🌸",
  "Har yaad aapki, dil ke kareeb rehti hai. 💖",
  "Baarish ki boondein bhi aapke saath khubsurat lagti hain. ☔",
  "Aapki mehnat hi aapki sabse badi pehchaan hai. ✨",
  "Aapke shabd hausla dete hain, har mod par. 🎙️",
  "Kala aur khoobsurti dono aapme basti hain. 🎨",
  "Baadal ke uper bhi aapka hausla uncha hai. 🌄",
  "Sukoon aapke saath hone ka naam hai. ☕",
  "Nayi subah aapke jaisi taazgi laati hai. 🌿",
  "Sapne dekhna aur poora karna aapse seekha. 🌅",
  "Waqt ki keemat aapne hi samjhayi. ⌚",
  "Aapka pyar hamesha saath rehta hai. 💐",
];

const VIDEO_URLS: string[] = [
  video1.url,
  video2.url,
  video3.url,
  video4.url,
  video5.url,
  video6.url,
  video7.url,
  video8.url,
  video9.url,
  video10.url,
];

const VIDEO_SHAYARI = [
  "Chalti tasveer me bhi aapki hansi sabse pyari hai. 🎬",
  "Ye pal hamesha yaadon me chalte rahenge. 🎞️",
  "Aapki awaaz me apnapan basta hai. 🔊",
  "Har frame me aapka pyar dikhta hai. 💝",
  "Ye video nahi, ek yaad hai. 🌸",
  "Aapke saath bitaya har lamha khaas hai. ✨",
  "Muskurate rahiye, yahi dua hai. 💖",
  "Ye chhoti si film, badi si yaad. 🎥",
  "Aapki khushi hi hamari khushi hai. 🎁",
  "Hamesha aise hi chamakti rahiye. 🌟",
];

export const GALLERY_CARDS: GalleryCard[] = [
  ...Array.from({ length: 42 }, (_, i): GalleryCard => ({
    id: `photo-${i + 1}`,
    kind: "photo",
    shayari: PHOTO_SHAYARI[i % PHOTO_SHAYARI.length] ?? "",
    url: PHOTO_URLS[i] ?? null,
    filename: `shikha-mam-photo-${i + 1}.jpeg`,
  })),
  ...Array.from({ length: 10 }, (_, i): GalleryCard => ({
    id: `video-${i + 1}`,
    kind: "video",
    shayari: VIDEO_SHAYARI[i % VIDEO_SHAYARI.length] ?? "",
    url: VIDEO_URLS[i] ?? null,
    filename: `shikha-mam-video-${i + 1}.mp4`,
  })),
];

export const UNLOCK_STORAGE_KEY = "shikha-mam-gallery-unlocked";
