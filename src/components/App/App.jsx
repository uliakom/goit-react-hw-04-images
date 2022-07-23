import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { fetchImages } from 'services/api';
import SearchBar from 'components/Searchbar/SearchBar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Modal from 'components/Modal';
import { startLoader, stopLoader } from 'components/Loader';

const App = () => {
  const [hits, setHits] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [largeUrl, setLargeUrl] = useState(null);
  const [tag, setTag] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;
    setStatus('pending');
    const loadData = async () => {
      try {
        const response = await fetchImages(searchQuery, page);
        setHits(prev => [...response, ...prev]);
        setStatus('resolved');
        stopLoader();
        if (response.length === 0) {
          Report.failure(
            'Search Failure',
            'There is no images for your query. Please enter other query',
            'Ok'
          );
          return;
        }
      } catch (error) {
        setStatus('rejected');
        console.log(error);
      } finally {
        stopLoader();
      }
    };
    loadData();
  }, [searchQuery, page]);

  const handleSearch = searchName => {
    setSearchQuery(searchName);
    setPage(1);
    setHits([]);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const onModalClose = () => {
    setLargeUrl(null);
    setTag(null);
  };

  const openModal = (url, alt) => {
    setLargeUrl(url);
    setTag(alt);
  };

  return (
    <Container>
      <SearchBar onSubmit={handleSearch} />
      {status === 'pending' && startLoader()}
      {status === 'resolved' && hits.length > 0 && (
        <>
          <ImageGallery images={hits} onOpenModal={openModal} />
          <Button onClick={handleLoadMore} />
        </>
      )}
      {status === 'rejected' && (
        <h2>Ups... Something went wrong. Please try again later.</h2>
      )}
      {largeUrl && <Modal url={largeUrl} alt={tag} onClose={onModalClose} />}
    </Container>
  );
};

export default App;
