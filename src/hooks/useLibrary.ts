import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import libraryState, { ILibraryState, library as defaultLibrary } from '../atoms/library.atom';

function useLibrary() {
  const [library, ssetLibrary] = useRecoilState(libraryState);

  useEffect(() => {
    if (document.location.href.indexOf('?reset=true') > -1) {
      console.log('CONFIG RESET');
      setLibrary({ ...defaultLibrary });
      document.location.href = '/';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setLibrary(updatedLibrary: ILibraryState) {
    ssetLibrary(updatedLibrary);
    //save in local storage
    localStorage.setItem('library', JSON.stringify(updatedLibrary));
  }

  return { library, setLibrary };
}

export default useLibrary;
