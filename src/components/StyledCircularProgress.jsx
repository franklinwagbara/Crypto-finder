import { CircularProgress } from "@material-ui/core";

const StyledCircularProgress = ({ size }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: size,
        justifyContent: "center",
      }}
    >
      <CircularProgress
        style={{
          color: "gold",
        }}
        size={250}
        thickness={1}
      />
    </div>
  );
};
export default StyledCircularProgress;
