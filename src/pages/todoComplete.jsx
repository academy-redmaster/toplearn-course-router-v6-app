import { useParams } from "react-router-dom";

export default function TodoCompletePage() {
  const {id , complete} = useParams()
    console.log("🚀 ~ TodoCompletePage ~ params id:", id)
    console.log("🚀 ~ TodoCompletePage ~ params complete:", complete)
    return (
      <div >
        <h1>TodoCompletePage</h1>
      </div>
    );
  }
  