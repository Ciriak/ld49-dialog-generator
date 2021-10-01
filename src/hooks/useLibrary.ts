import { useRecoilState } from 'recoil';
import libraryState, { ILibraryState } from '../atoms/library.atom';

function useLibrary() {
  const [library, ssetLibrary] = useRecoilState(libraryState);

  function setLibrary(updatedLibrary: ILibraryState) {
    ssetLibrary(updatedLibrary);
    //save in local storage
    localStorage.setItem('library', JSON.stringify(updatedLibrary));
  }

  return { library, setLibrary };
}

export default useLibrary;
