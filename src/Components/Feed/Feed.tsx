/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Style from "./Feed.module.scss";
import { FadeLoader } from "react-spinners"
import moment from "moment";
import Article from '../Article/Article';
import { history } from '../../Router';

const Feed = () => {
  const [articles, setArticles] = useState<NFeedResponse.Article[]>([]);
  const [page, updatePage] = useState<number>(1);
  const [isFetching, updateFetchingState] = useState<boolean>(false);
  const [isArticlePageOpen, toggleArticlePage] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [articleNumber, updateArticleNumber] = useState<number>(0);

  const proxy = "https://cors-anywhere.herokuapp.com/";
  const pageSize = 20;

  const maxPagination = Math.ceil((totalResults / pageSize));

  const apiKey = "8f483bd6e473463a92c186556fd43969";
  const url = `${proxy}https://newsapi.org/v2/top-headlines?country=us&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;
  const req = new Request(url);
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  function getArticles() {
    updateFetchingState(true);

    fetch(req, options)
      .then(function (response) {
        response.json()
          .then((res: NFeedResponse.RootObject) => {
            if (res.status === "ok") {
              const allArticles = [...articles, ...res.articles];

              setArticles(allArticles);
              setTotalResults(res.totalResults);
            }
          })
      })
      .catch(err => console.log(err))
      .finally(() => updateFetchingState(false))
  }


  useEffect(() => {
    getArticles();
  }, [page]);

  const onArticleClick = ({ currentTarget }: React.MouseEvent<HTMLElement>) => {
    const index = currentTarget.getAttribute("t-whoami");
    const indexToNumber = index === null ? 0 : parseInt(index);

    updateArticleNumber(indexToNumber);

    toggleArticlePage(true)

    history.push(`/feed?article=${indexToNumber}`);
  }

  const renderArticles = ({
    title,
    urlToImage,
    author,
    description,
    source: { name },
    publishedAt,
    url
  }: NFeedResponse.Article, idx: number) => {

    const formattedDate = moment(publishedAt).format("MMM DD, YYYY");

    return (
      <div key={idx} className={Style.article_container} t-whoami={idx} onClick={onArticleClick}>
        <div className={Style.article_details}>
          <div className={Style.source_container}>
            <div className={Style.source}>{name}</div>
            {author && <div className={Style.author}>By {author}</div>}
          </div>
          <div className={Style.date_and_domain}>
            <a
              onClick={e => e.stopPropagation()}
              className={Style.domain}
              target="_blank"
              href={url}
              rel="noopener noreferrer"
            >{url.slice(0, 20)}</a>
            <div className={Style.date}>{formattedDate}</div>
          </div>
        </div>

        <div className={Style.description}>{description}</div>
        <div className={Style.img_container}>
          <img className={Style.img} src={urlToImage} alt="articleImg" />
        </div>
        <h2>{title}</h2>
      </div >)
  }

  const handleScroll = ({ target }: any) => {
    if (target.scrollHeight - target.scrollTop === target.clientHeight && !isFetching && page !== maxPagination) {
      updatePage(page + 1)
    }
  }

  const closeArticle = () => {
    toggleArticlePage(false);
    history.replace('/feed')
  }

  return (
    <div className={Style.container}>
      <h2>News Feed</h2>
      <div className={Style.feed_container} onScroll={handleScroll}>
        {articles.map(renderArticles)}
        <FadeLoader
          color="#ddd"
          loading={isFetching}
        />
      </div>
      {isArticlePageOpen && <Article {...articles[articleNumber]} closeArticle={closeArticle} />}
    </div>
  );
};

export default Feed;