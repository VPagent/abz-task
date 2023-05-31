import { FC } from "react";
import { ColorRing } from "react-loader-spinner";

type Props = {
  className: string;
};

const Loader: FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#00BDD3", "#00BDD3", "#00BDD3", "#00BDD3", "#00BDD3"]}
      />
    </div>
  );
};

export default Loader;
