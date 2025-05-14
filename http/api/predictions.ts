import axiosInstance from '@/http/axiosInstance';

// Types for API responses
export interface PredictionInputData {
  abortions: number;
  age: number;
  amh: number;
  avg_f_size_l: number;
  avg_f_size_r: number;
  blood_group: number;
  bmi: number;
  bp_diastolic: number;
  bp_systolic: number;
  cycle_length: number;
  cycler: number;
  endometrium: number;
  fast_food: number;
  follicle_no_l: number;
  follicle_no_r: number;
  fsh_lh: number;
  hair_growth: number;
  hair_loss: number;
  hgb: number;
  i_hcg: number;
  ii_hcg: number;
  marriage_status: number;
  pimples: number;
  pregnant: number;
  prg: number;
  prl: number;
  rbs: number;
  reg_exercise: number;
  skin_darkening: number;
  tsh: number;
  vit_d3: number;
  waist_hip_ratio: number;
  weight: number;
  weight_gain: number;
}

export interface Prediction {
  created_at: string;
  id: string;
  input_data: PredictionInputData;
  prediction: number;
  prediction_label: string;
  probability: number | null;
  risk_level: "low" | "medium" | "high";
  user_id: string;
}

export interface PredictionsResponse {
  predictions: Prediction[];
  success: boolean;
}

export interface PredictionDetailResponse {
  prediction: Prediction;
  success: boolean;
}

// Get all predictions for the current user
export const getPredictions = async (): Promise<Prediction[]> => {
  try {
    const response = await axiosInstance.get<PredictionsResponse>('/predict/predictions');
    return response.data.predictions;
  } catch (error) {
    console.error('Error fetching predictions:', error);
    throw error;
  }
};

// Get a specific prediction by ID
export const getPredictionById = async (id: string): Promise<Prediction> => {
  try {
    const response = await axiosInstance.get<PredictionDetailResponse>(`/predict/predictions/${id}`);
    return response.data.prediction;
  } catch (error) {
    console.error('Error fetching prediction details:', error);
    throw error;
  }
};

// Submit a new prediction
export const submitPrediction = async (data: Partial<PredictionInputData>): Promise<Prediction> => {
  try {
    const response = await axiosInstance.post<PredictionDetailResponse>('/predict/submit', data);
    return response.data.prediction;
  } catch (error) {
    console.error('Error submitting prediction:', error);
    throw error;
  }
}; 