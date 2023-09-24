// import { Card } from "../../../packages/superkit-ui";
import styles from "./page.module.css";
import Pages from "./Components/widget/page";
// import { mulNums } from "superkit-sdk";

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <Pages />
    </main>
  );
}
