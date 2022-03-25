import Image from "next/image";
import { useEffect, useState } from "react";

function ContentImage({ img, name }: { img: string; name: string }) {
  const randomColor = [
    "from-emerald-900/40",
    "from-green-900/40",
    "from-pink-900/40",
    "from-purple-900/40",
    "from-fuchsia-900/40",
    "from-violet-900/40",
    "from-rose-900/40",
    "from-red-900/40",
    "from-orange-900/40",
    "from-amber-900/40",
    "from-yellow-900/40",
    "from-lime-900/40",
    "from-teal-900/40",
    "from-cyan-900/40",
    "from-sky-900/40",
    "from-blue-900/40",
    "from-indigo-900/40",
  ];

  const num = Math.floor(Math.random() * randomColor.length);
  const [color, setColor] = useState(0);
  useEffect(() => {
    setColor(num);
  }, [num]);
  return (
    <>
      <Image
        src={img}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="sticky top-0 opacity-40"
        alt={name}
        blurDataURL="https://dummyimage.com/1920x1080/fff/aaa"
        placeholder="blur"
        priority
        // loader={uploadcareLoader}
      />
      <div
        className={`absolute top-0 left-0 h-full w-full bg-gradient-to-b ${randomColor[color]} via-slate-900 to-black opacity-[0.85]`}
      />
    </>
  );
}

export default ContentImage;
