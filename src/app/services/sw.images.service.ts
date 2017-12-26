import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import _ from "lodash";

@Injectable()
export class SwImagesService {
  private basepath:string = "";

  constructor(private http:HttpClient) { 
    
  }

  getPlanetPicture(name) {
    let planetPictures = [
      { name: 'Alderaan', url: 'https://vignette.wikia.nocookie.net/starwars/images/4/4a/Alderaan.jpg/revision/latest?cb=20061211013805' },
      { name: 'Yavin IV', url: 'assets/yaviniv2.png' },
      { name: 'Hoth', url: 'https://vignette.wikia.nocookie.net/starwars/images/1/1d/Hoth_SWCT.png/revision/latest/scale-to-width-down/500?cb=20160630022322' },
      { name: 'Dagobah', url: 'https://vignette.wikia.nocookie.net/starwars/images/4/48/Dagobah_ep3.jpg/revision/latest/scale-to-width-down/500?cb=20100122163146' },
      { name: 'Bespin', url: 'https://vignette.wikia.nocookie.net/starwars/images/1/11/Bespin-SWCT.png/revision/latest/scale-to-width-down/500?cb=20170709211642' },
      { name: 'Naboo', url: 'https://vignette.wikia.nocookie.net/starwars/images/4/41/Naboo_FFGRebellion.png/revision/latest/scale-to-width-down/500?cb=20170529051916' },
      { name: 'Coruscant', url: 'https://vignette.wikia.nocookie.net/es.starwars/images/1/17/Coruscant-AoTCW.jpg/revision/latest/scale-to-width-down/350?cb=20100213220520' },
      { name: 'Geonosis', url: 'https://www.nasa.gov/sites/default/files/thumbnails/image/edu_what_is_mars.jpg' },
      { name: 'Kamino', url: 'https://vignette.wikia.nocookie.net/starwars/images/a/a9/Eaw_Kamino.jpg/revision/latest?cb=20090527045541' },
      { name: 'Endor', url: 'https://vignette.wikia.nocookie.net/starwars/images/5/50/Endor_FFGRebellion.png/revision/latest?cb=20170529052722' },
      { name: 'Utapau', url: 'https://vignette.wikia.nocookie.net/starwars/images/c/ce/UtapauRotS.png/revision/latest?cb=20160118063015' },
      { name: 'Mustafar', url: 'https://vignette2.wikia.nocookie.net/starwars/images/a/af/Mustafar_DB.png/revision/latest?cb=20160118061913' },
      { name: 'Kashyyyk', url: 'https://vignette3.wikia.nocookie.net/starwars/images/d/d0/Kashyyyk_FFGRebellion.png/revision/latest?cb=20170529040615' },
      { name: 'Polis Massa', url: 'https://vignette.wikia.nocookie.net/starwars/images/2/22/PolisMassaNEGAS.jpg/revision/latest?cb=20061119201146' },
      { name: 'Mygeeto', url: 'https://vignette.wikia.nocookie.net/starwars/images/e/eb/MygeetoFromSpace.jpg/revision/latest?cb=20051104084715' },
      { name: 'Felucia', url: 'https://vignette.wikia.nocookie.net/starwars/images/a/a2/Felucia_SWCT.png/revision/latest/scale-to-width-down/500?cb=20170714021015' },
      { name: 'Cato Neimoidia', url: 'https://vignette.wikia.nocookie.net/greatmultiverse/images/a/ac/CatoNeimoidia2.jpg/revision/latest?cb=20120505151345' },
      { name: 'Saleucami', url: 'https://vignette.wikia.nocookie.net/starwars/images/a/a3/Saleucami_MPQ.png/revision/latest?cb=20160619160412' },
      { name: 'Stewjon', url: 'https://holopedia.de/images/thumb/a/ad/PlanetStewjon.jpg/250px-PlanetStewjon.jpg' },
      { name: 'Eriadu', url: 'https://vignette.wikia.nocookie.net/starwars/images/5/58/Eriadu.jpg/revision/latest?cb=20071219212015' },
      { name: 'Corellia', url: 'https://vignette.wikia.nocookie.net/starwars/images/7/7f/Corellia_SOF.png/revision/latest?cb=20170222012701'},
      { name: 'Rodia', url: 'https://vignette.wikia.nocookie.net/starwars/images/6/6c/Rodia_System.png/revision/latest?cb=20130716230359' },
      { name: 'Nal Hutta', url: 'https://pm1.narvii.com/6366/c7bd8f381caae827421c445af67b727aa4bb0a2e_hq.jpg' },
      { name: 'Dantooine', url: 'https://scontent-sea1-1.cdninstagram.com/t51.2885-15/s480x480/e35/c0.0.702.702/21148984_1970875096527281_890852929601273856_n.jpg' },
      { name: 'Bestine IV', url: 'https://pbs.twimg.com/profile_images/561951428982226944/ZUaMl2bF.jpeg' },
      { name: 'Ord Mantell', url: 'https://vignette1.wikia.nocookie.net/starwars/images/3/36/Ord_Mantell_EotECR.png/revision/latest?cb=20170222012958' },
      { name: 'Trandosha', url: 'https://i.pinimg.com/236x/5f/c5/3e/5fc53e503aeaf52f181315f2f44eed39--galaxy-planets-star-wars-planets.jpg' },
      { name: 'Socorro', url: 'https://i.pinimg.com/736x/d4/f0/06/d4f006769bcce0c7101b421790e24c54--binary-star-star-wars-planets.jpg'},
      { name: 'Mon Cala', url: 'https://vignette.wikia.nocookie.net/aliens/images/6/6a/Dac.jpg/revision/latest?cb=20090914172244'},
      { name: 'Chandrila', url: 'https://vignette.wikia.nocookie.net/aliens/images/6/63/Chandrila.jpg/revision/latest?cb=20170427000440'},
      { name: 'Sullust', url: 'https://vignette.wikia.nocookie.net/starwars/images/2/2d/SullustAoR.png/revision/latest?cb=20170222011923'},
      { name: 'Toydaria', url: 'https://vignette.wikia.nocookie.net/starwars/images/b/ba/Toydaria_LoNH.png/revision/latest/scale-to-width-down/500?cb=20170315060045'},
      { name: 'Malastare', url: 'https://vignette.wikia.nocookie.net/starwars/images/d/df/MalastareNEGAS.jpg/revision/latest?cb=20061119155609' },
      { name: 'Dathomir', url: 'https://vignette.wikia.nocookie.net/starwars/images/f/f3/Dathomir-Massacre.png/revision/latest?cb=20150306134751' },
      { name: 'Ryloth', url: 'https://vignette.wikia.nocookie.net/starwars/images/d/d3/Ryloth_EotECR.png/revision/latest?cb=20170222013022' },
      { name: 'Aleen Minor', url: 'https://vignette.wikia.nocookie.net/starwars/images/6/66/Aleen_FDNP.png/revision/latest?cb=20160617232127' },
      { name: 'Vulpter', url: 'https://vignette.wikia.nocookie.net/starwars/images/b/be/Vulpter_FF7.jpg/revision/latest?cb=20070628190912' },
      { name: 'Troiken', url: 'https://vignette.wikia.nocookie.net/galuswrpg/images/2/29/Quermia_NEGAS.jpg/revision/latest?cb=20110510190624' },
      { name: 'Tund', url: 'https://vignette.wikia.nocookie.net/starwars/images/2/27/Tundatlas.jpg/revision/latest?cb=20100515115645' },
      { name: 'Haruun Kal', url: 'https://vignette.wikia.nocookie.net/starwars/images/9/92/HaruunKalCSWE.JPG/revision/latest?cb=20120821183509' },
      { name: 'Tatooine', url: 'https://vignette.wikia.nocookie.net/starwars/images/8/82/Tatooine-TOR.jpg/revision/latest?cb=20091218162907' },
      { name: 'Jakku', url: 'https://vignette.wikia.nocookie.net/starwars/images/f/f4/Jakku_-_full_-_SW_Poe_Dameron_Flight_Log_.png/revision/latest?cb=20170720130554' },
      { name: 'Umbara', url: 'https://vignette.wikia.nocookie.net/starwars/images/2/2d/Umbara-Planet_SWTOR.jpg/revision/latest?cb=20170818123850' },
      { name: 'Kalee', url: 'https://vignette.wikia.nocookie.net/starwars/images/0/08/KaleePlanet.jpg/revision/latest?cb=20061118121433' },
      { name: 'Shili', url: 'https://vignette.wikia.nocookie.net/starwars/images/b/b8/ShiliNEGAS.jpg/revision/latest?cb=20061126102716' },
      { name: 'Muunilinst', url: 'https://vignette.wikia.nocookie.net/starwars/images/1/19/Muunilinst.jpg/revision/latest?cb=20071221131608' },
      { name: 'Cerea', url: 'https://vignette.wikia.nocookie.net/starwars/images/c/cc/Cerea-FDCR.png/revision/latest?cb=20160304045551' },
      { name: 'Glee Anselm', url: 'https://vignette.wikia.nocookie.net/jedipedia/images/0/0c/GleeAnselm.jpg/revision/latest?cb=20110427062745&path-prefix=de' },
      { name: 'Iridonia', url: 'https://vignette.wikia.nocookie.net/starwars/images/c/c5/Iridonia.jpg/revision/latest?cb=20061118121317' },
      { name: 'Tholoth', url: 'https://lh4.googleusercontent.com/nR67QB9DURX0lWxzQ8Iw6N5lMp7_n1la--KCLPHxvYYoMr70dkQOxuOopqP1ZrIn6wDw7KvkqRH36Wk5CS91vm_mz9M86mzBVrWToVgTLNR6g5waQ-JAJfg2QxAMqE31BAfrfO91' },
      { name: 'Iktotch', url: 'https://vignette.wikia.nocookie.net/starwars/images/f/f1/Iktotch_FDNP.png/revision/latest?cb=20160617050753' },
      { name: 'Quermia', url: 'https://vignette.wikia.nocookie.net/starwars/images/2/29/Quermia_NEGAS.jpg/revision/latest?cb=20070701083603' },
      { name: 'Dorin', url: 'http://2.bp.blogspot.com/_iRFa-dX-qzU/Sx1tvc1x9tI/AAAAAAAABIE/jMKviFeYdxA/s400/OrdMantell-TOR.jpg' },
      { name: 'Champala', url: 'https://vignette.wikia.nocookie.net/starwars/images/d/d7/Champala_NEGAS.jpg/revision/latest?cb=20061114221731' }, 
      { name: 'Mirial', url: 'http://images.wikia.com/starwars/images/3/3e/Thule.jpg' },
      { name: 'Serenno', url: 'https://vignette.wikia.nocookie.net/starwars/images/2/24/NabooFull-SW.png/revision/latest?cb=20131223053139' },
      { name: 'Concord Dawn', url: 'https://vignette.wikia.nocookie.net/starwars/images/8/84/Concord_Dawn_system.png/revision/latest?cb=20160128214904' },
      { name: 'Zolan', url: 'https://vignette.wikia.nocookie.net/starwars/images/6/66/Zolan.jpg/revision/latest?cb=20070701111500' },
      { name: 'Ojom', url: 'https://vignette.wikia.nocookie.net/starwars/images/9/9f/Ojom.jpg/revision/latest?cb=20061119201000' },
      { name: 'Skako', url: 'https://vignette.wikia.nocookie.net/aliens/images/c/cd/Skako.jpg/revision/latest?cb=20091003222302' }
    ]

    return _.find(planetPictures, {name: name});
  }
}
