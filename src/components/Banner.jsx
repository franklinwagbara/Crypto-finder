import { Container, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core";
import { lazy, Suspense } from "react";

const Carousel = lazy(() => import("./Carousel"));

const useStyles = makeStyles({
  banner: {
    backgroundImage: "url(./banner2.jpg)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 25,
  },
  tagline: {
    height: "40%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  headline: {
    fontWeight: "bold",
    marginBottom: 15,
  },
  skeletonContainer: {
    width: "100%",
    paddingTop: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  skeleton: {
    backgroundColor: "#f8f8f822",
    width: 150,
    height: 100,
  },
});

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography className={classes.headline} variant="h2">
            Crypto Finder
          </Typography>
          <Typography variant="subtitle2">
            Get All The Information Regarding Your Favorite Cryto-Currency
          </Typography>
        </div>
        <Suspense fallback={<CarouselFallback />}>
          <Carousel />
        </Suspense>
      </Container>
    </div>
  );
};
export default Banner;

export const CarouselFallback = () => {
  const classes = useStyles();
  return (
    <div className={classes.skeletonContainer}>
      <div>
        <Skeleton variant="rect" className={classes.skeleton} />
        <Skeleton
          variant="rect"
          className={classes.skeleton}
          style={{ height: 30, marginTop: 10 }}
        />
      </div>
      <div>
        <Skeleton variant="rect" className={classes.skeleton} />
        <Skeleton
          variant="rect"
          className={classes.skeleton}
          style={{ height: 30, marginTop: 10 }}
        />
      </div>
      <div>
        <Skeleton variant="rect" className={classes.skeleton} />
        <Skeleton
          variant="rect"
          className={classes.skeleton}
          style={{ height: 30, marginTop: 10 }}
        />
      </div>
    </div>
  );
};
