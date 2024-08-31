import hidrataçãoIcon from "../assets/hugeicons_shampoo.svg";
import barbaIcon from "../assets/mdi_mustache.svg";
import acabamentoIcon from "../assets/mdi_razor-double-edge.svg";
import sobrancelhaIcon from "../assets/mingcute_eyebrow-fill.svg";
import massagemIcon from "../assets/ph_towel-fill.svg";

interface QuickSearchOption {
  imageUrl: any;
  title: string;
}

export const quickSearchOptions: QuickSearchOption[] = [
  {
    title: "Cabelo",
    imageUrl: "cabeloIcon3",
  },
  {
    title: "Barba",
    imageUrl: barbaIcon,
  },
  {
    title: "Acabamento",
    imageUrl: acabamentoIcon,
  },
  {
    title: "Massagem",
    imageUrl: massagemIcon,
  },
  {
    title: "Sobrancelha",
    imageUrl: sobrancelhaIcon,
  },
  {
    title: "Hidratação",
    imageUrl: hidrataçãoIcon,
  },
];
