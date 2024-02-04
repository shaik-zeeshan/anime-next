const genres = [
      {
            genre: "Action",
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-C6FPmWm59CyP.jpg",
      },
      {
            genre: "Adventure",
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-PEn1CTc93blC.jpg",
      },
      {
            genre: "Comedy",
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21202-TfzXuWQf2oLQ.png",
      },
      {
            genre: "Drama",
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5114-KJTQz9AIm6Wk.jpg",
      },
      {
            genre: "Ecchi",
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx11617-nmxMU9Zh3H5R.jpg",
      },
      {
            genre: "Fantasy",
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx11061-sIpBprNRfzCe.png",
      },
      {
            genre: "Horror",
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx11111-Y4QgkX8gJQCa.png",
      },
      {
            genre: "Mahou Shoujo",
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx104051-tFMIbiffwBLs.jpg",
      },
      {
            genre: "Mecha",
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx116589-WSpNedJdAH3L.jpg",
      },
      {
            genre: "Music",
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20665-CnzR2zVpdxtR.png",
      },
      {
            genre: "Mystery",
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21234-v2NMgPyoVRoM.jpg",
      },
      {
            genre: "Psychological",
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-lawCwhzhi96X.jpg",
      },
      {
            genre: "Romance",
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20954-UMb6Kl7ZL8Ke.jpg",
      },
      {
            genre: "Sci-Fi",
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx9253-7pdcVzQSkKxT.jpg",
      },
      {
            genre: "Slice of Life",
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx12189-eBb6fcM21Zh7.jpg",
      },
      {
            genre: "Sports",
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20464-eW7ZDBOcn74a.png",
      },
      {
            genre: "Supernatural",
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pEFseh.jpg",
      },
      {
            genre: "Thriller",
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1575-ZJYlg8yjvMKI.jpg",
      },
      // {
      //       genre: "Hentai",
      //       image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-C6FPmWm59CyP.jpg",
      // },
];

export type Genre = (typeof genres)[number];

export type Genres = Genre[];

export default genres;
