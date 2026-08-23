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

export type GalleryCard = {
  id: string;
  kind: "photo" | "video";
  shayari: string;
  url: string | null;
  filename: string;
};

const PHOTO_URLS: string[] = [
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
    url: null,
    filename: `shikha-mam-video-${i + 1}.mp4`,
  })),
];

export const UNLOCK_STORAGE_KEY = "shikha-mam-gallery-unlocked";
