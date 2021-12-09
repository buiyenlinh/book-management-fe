import API from "@/services"

export default function UseAuthor() {
  const getAuthorList = async () => {
    return API.get('author');
  }
}