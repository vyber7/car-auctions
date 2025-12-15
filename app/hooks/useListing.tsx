//the following hook is used to fetch listing id from the url
import { useParams } from "next/navigation";

export default function useListing() {
  const { id } = useParams();

  return id as string;
}
