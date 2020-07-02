import React from 'react';
import Style from "./Article.module.scss";
import moment from "moment";
import leftArrow from "./leftArrow.svg";

export default ({
  closeArticle,
  author,
  content,
  description,
  publishedAt,
  source: { name },
  title,
  urlToImage
}: any) => {
  return (
    <div className={Style.container}>
      <div className={Style.back} onClick={closeArticle}>
        <img src={leftArrow} alt="back" className={Style.arrow} />
        Back to Feed
        </div>
      <div>
        <h1>{title}</h1>
        <div className={Style.details}>
          {"By " + author + "  |  "} {name}  |  {moment(publishedAt).format("MMM DD, YYYY")}
        </div>
        <h2>{description}</h2>
        <div>
          <img src={urlToImage} alt="" className={Style.img} />
          <p className={Style.content}>{content}</p>
        </div>
      </div>
    </div>
  );
};
