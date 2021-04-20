const renderCommonMetaTags = (
  title?: string,
  description?: string,
  thumbnailURL?: string,
  url?: string,
  published_time?: string,
  keywords?: string,
  canonical_url?: string,
) => {
  return (
    <>
      <title>{title}</title>
      <meta key="title" content={title} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="description" content={description} />

      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={thumbnailURL} />

      <meta name="twitter:card" content={thumbnailURL} />
      <meta
        name="twitter:title"
        content={`Surf Life Saving Foundation - ${title}`}
      />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image:src" content={thumbnailURL} />

      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={thumbnailURL} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Surf Life Saving Foundation" />
      {published_time && (
        <meta property="article:published_time" content={published_time} />
      )}
      {published_time && (
        <meta property="article:modified_time" content={published_time} />
      )}
      {canonical_url && <link rel="canonical" href={canonical_url} />}
    </>
  );
};

export default renderCommonMetaTags;
