import netflix from "../assets/providers/netflix.jpg";
import amazonPrimeVideo from "../assets/providers/amazon-prime-video.png";
import zee5 from "../assets/providers/zee5.jpg";
import jioCinema from "../assets/providers/jio-cinema.jpg";
import voot from "../assets/providers/voot.webp";

const link = (id: number) => `/content/providers/${id}`;

const providersObj = {
  amazonPrimeVideo: {
    img: amazonPrimeVideo,
    title: "amazon prime video",
    id: 119,
  },
  netflix: {
    img: netflix,
    title: "netflix",
    id: 8,
  },
  zee5: { img: zee5, title: "zee5", id: 232 },
  jioCinema: { img: jioCinema, title: "jio cinema", id: 220 },
  voot: { img: voot, title: "voot", id: 121 },
};

export const providers = Object.values(providersObj).map((provider, index) => ({
  ...provider,
  link: link(provider.id),
  key: index,
}));
