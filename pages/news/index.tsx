import { GetStaticProps } from "next";
import { News } from "../../typing";
import { One_HOUR } from "../../utils/appConfig";
import { newsAxios } from "../../utils/custAxios";

function News(props: { news: News }) {
  const { news } = props;
  return (
    <article>
      <h1 className="my-5 ml-5 text-3xl">News</h1>
      <div className="grid grid-cols-1 gap-5 px-5 md:grid-cols-2 lg:grid-cols-3">
        {news.articles.map((article, index) => {
          return (
            <div
              key={index}
              className="group"
              onClick={() => {
                window.location.href = article.source.url;
              }}
            >
              <div className="overflow-hidden rounded-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="cover h-auto w-full bg-black transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="my-2 text-lg">{article.title}</h3>
              <p className="text-slate-400">By {article.source.name}</p>
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default News;

export const getStaticProps: GetStaticProps = async () => {
  const news: News = await newsAxios
    .get("search", { params: { page: 1 } })
    .then((res) => res.data);
  return { props: { news }, revalidate: One_HOUR * 0.5 };
};
