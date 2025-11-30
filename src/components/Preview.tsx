import type { PreviewPropsInterface } from "../interfaces";

export default function Preview(props: PreviewPropsInterface) {
  return <label>{JSON.stringify(props.form, null, 2)}</label>;
}
