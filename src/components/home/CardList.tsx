import ActionAreaCard from '../../core/components/cards/ActionAreaCard'; 
import bonnetRouge1 from '../../assets/images/bonet-rouge.jpeg';
import bonnetRouge2 from '../../assets/images/bonnet-rouge.jpg';
import { Box } from '@mui/material';

const cardsData = [
  {
    title: 'Lizard 1',
    description: 'Description 1 zeoafazeof  dzcsdcze azefoazeof azefjazef zeafazef',
    imageUrl: bonnetRouge1,
  },
  {
    title: 'Lizard 2',
    description: 'Description 1 zeoafazeof  dzcsdcze azefoazeof azefjazef zeffzef',
    imageUrl: bonnetRouge2,
  },
  {
    title: 'Lizard 2',
    description: 'Description 1 zeoafazeof  dzcsdcze azefoazeof azefjazef zefzef',
    imageUrl: bonnetRouge1,
  },
  {
    title: 'Lizard 2',
    description: 'Description 1 zeoafazeof  dzcsdcze azefoazeof azefjazeff defzeaf',
    imageUrl: bonnetRouge2,
  },

];

function CardList() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between', // Pour séparer les éléments
        padding:2
      }}
    >
      {cardsData.map((card, index) => (
        <ActionAreaCard
          key={index}
          title={card.title}
          description={card.description}
          imageUrl={card.imageUrl}
       
        />
      ))}
    </Box>
  );
}

export default CardList;
