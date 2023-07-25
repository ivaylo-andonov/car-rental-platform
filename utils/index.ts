import { FilterProps } from '@/app/page';
import { config } from '../config'
import axios from 'axios';

const {
  RAPID_API_KEY,
  RAPID_API_HOST,
  RAPID_API_CARS_BASE_URL
} = process.env;

export interface CarReadModel {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}

const getOptions = ({ manufacturer, model, year, limit, fuel }: FilterProps) => ({
  method: 'GET',
  url: RAPID_API_CARS_BASE_URL,
  params: { make: manufacturer, year, model, fuel_type: fuel, limit },
  headers: {
    'X-RapidAPI-Key': RAPID_API_KEY,
    'X-RapidAPI-Host': RAPID_API_HOST
  }
});

export const fetchCars = async (filters: FilterProps) => {
  try {
    const { data } = await axios.request<CarReadModel[]>(getOptions(filters));
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      throw new Error(error.message);
    } else {
      console.log('unexpected error: ', error);
      throw error;
    }
  }
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarReadModel, angle?: string) => {
  const url = new URL(config.NEXT_PUBLIC_IMAGIN_API_URL);
  const { make, model, year } = car;


  url.searchParams.append('customer', config.NEXT_PUBLIC_IMAGIN_API_KEY);
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
}

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  // Set the specified search parameter to the given value
  const newSearchParams = new URLSearchParams(window.location.search);

  // Delete the specified search parameter
  newSearchParams.delete(type.toLocaleLowerCase());

  // Construct the updated URL pathname with the deleted search parameter
  const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;

  return newPathname;
};
