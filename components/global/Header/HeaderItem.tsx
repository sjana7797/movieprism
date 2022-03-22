import Link from "next/link";
import { useRouter } from "next/router";
import { HeaderItem } from "../../../typing";

function HeaderItem({ icon }: { icon: HeaderItem }) {
  const router = useRouter();
  const isRoute = router.pathname === icon.link;
  return (
    <Link href={icon.link} passHref>
      <div
        className={`group flex w-12 cursor-pointer flex-col items-center font-bold text-slate-100 transition-colors duration-300 hover:text-emerald-400 sm:w-20 ${
          isRoute && "text-emerald-400"
        }`}
      >
        <icon.Icon className="mb-1 h-8 w-8 group-hover:animate-bounce" />
        <p className="whitespace-nowrap text-lg font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100">
          {icon.title}
        </p>
      </div>
    </Link>
  );
}

export default HeaderItem;
