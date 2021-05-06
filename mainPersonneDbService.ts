import { ipcMain } from 'electron';
import { Personne } from './src/app/entity';


const getPersonnes = async (personneRepo) => {
  ipcMain.on('getPersonnes', async (event: any, ...args: any[]) => {
    try {
      event.returnValue = await personneRepo.find({ relations: [
        "nom",
        "pere",
        "pere.nom",
        "pere.clan",
        "mere",
        "mere.nom",
        "mere.clan",
        "clan",
        "profession",
        "dureeDeVie",
        "partenaire",
        "partenaire.nom",
        "partenaire.clan",
        "partenaires",
        "partenaires.nom",
        "partenaires.pere",
        "partenaires.mere",
        "partenaires.clan",
        "enfants",
      ] });
    } catch (err) {
      throw err;
    }
  });
};


const addPersonne = async (personneRepo) => {
  ipcMain.on('addPersonne', async (event: any, _item: Personne ) => {
    try {
      const item = await personneRepo.create(_item);
      await personneRepo.save(item);
      event.returnValue = await personneRepo.find();
    } catch (err) {
      console.log(err);
    }
  });
};

const updatePersonne = async (personneRepo) => {
  ipcMain.on('updatePersonne', async (event: any, _item:Personne ) => {
    try {
      await personneRepo.update(
        _item.id ,
        _item
      );;
      event.returnValue = await personneRepo.find();
    } catch (err) {
      console.log(err);
    }
  });
};

const deletePersonne = async (personneRepo) => {
  ipcMain.on('deletePersonne', async (event: any,  _item: Personne ) => {
    try {
      const item = await personneRepo.create(_item);
      await personneRepo.remove(item);
      event.returnValue = await personneRepo.find();
    } catch (err) {
     console.log(err);
    }
  });
};

const getPersonneDetail = async (detailRepo) => {
  ipcMain.on('getPersonneDetail', async (event: any, ...args: any[]) => {
    try {
      event.returnValue = await detailRepo.find({ relations: ["clan"] });
    } catch (err) {
      console.log(err);
    }
  });
};

export { 
  getPersonnes,
  addPersonne,
  deletePersonne,
  updatePersonne,
  getPersonneDetail
}

