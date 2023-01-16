import axios, { AxiosError } from 'axios';
const baseUrl = 'http://127.0.0.1:3000';

// Engineer
export interface EngineerResponse {
  id: string;
  lastName: string;
  firstName: string | null;
  lastNameKana: string | null;
  firstNameKana: string | null;
  sex: number | null;
  employeeId: string | null;
  employeeCategory: number | null;
  laborCost: number | null;
  company: string | null;
}
export const getEngineer = async (): Promise<EngineerResponse[]> => {
  const url = `${baseUrl}/engineer`;
  try {
    const response = await axios.get<EngineerResponse[]>(url);
    return response.data;
  } catch (err) {
    const error = err as Error | AxiosError;
    if (!axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error(`Error in 'url(${url})': ${error.message}`);
  }
};

export interface EngineerWithHistoryResponse {
  id: string;
  lastName: string;
  firstName: string | null;
  lastNameKana: string | null;
  firstNameKana: string | null;
  sex: number | null;
  employeeId: string | null;
  employeeCategory: number | null;
  laborCost: number | null;
  company: string | null;
  projectHistory: ProjectHistoryResponse[];
}
export const getEngineerWithHistory = async (engineerId: string): Promise<EngineerWithHistoryResponse> => {
  const url = `${baseUrl}/engineer/${engineerId}`;
  try {
    const response = await axios.get<EngineerWithHistoryResponse>(url);
    return response.data;
  } catch (err) {
    const error = err as Error | AxiosError;
    if (!axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error(`Error in 'url(${url})': ${error.message}`);
  }
};

export interface EngineerInput {
  lastName: string;
  firstName: string | null;
  lastNameKana: string | null;
  firstNameKana: string | null;
  sex: number | null;
  employeeId: string | null;
  employeeCategory: number | null;
  laborCost: number | null;
  company: string | null;
}
export const createEngineer = async (engineerInput: EngineerInput) => {
  const url = `${baseUrl}/engineer/create`;
  try {
    const response = await axios.post(url, engineerInput);
    return;
  } catch (err) {
    const error = err as Error | AxiosError;
    if (!axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error(`Error in 'url(${url})': ${error.message}`);
  }
};
export const updateEngineer = async (engineerId: number, engineerInput: EngineerInput) => {
  const url = `${baseUrl}/engineer/update/${engineerId}`;
  try {
    const response = await axios.post(url, engineerInput);
    return;
  } catch (err) {
    const error = err as Error | AxiosError;
    if (!axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error(`Error in 'url(${url})': ${error.message}`);
  }
};

// Project

export interface ProjectResponse {
  id: string;
  projectNameMask: string;
  projectName: string;
  startDate: string;
  endDate: string | null;
  endUser: string;
}

export const getProject = async (): Promise<ProjectResponse[]> => {
  const url = `${baseUrl}/project`;
  try {
    const response = await axios.get<ProjectResponse[]>(url);
    return response.data;
  } catch (err) {
    const error = err as Error | AxiosError;
    if (!axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error(`Error in 'url(${url})': ${error.message}`);
  }
};

export interface ProjectWithHistoryResponse {
  id: string;
  projectNameMask: string;
  projectName: string;
  startDate: string;
  endDate: string | null;
  endUser: string;
  projectHistory: ProjectHistoryResponse[];
}
export const getProjectWithHistory = async (): Promise<ProjectWithHistoryResponse[]> => {
  const url = `${baseUrl}/project/history`;
  try {
    const response = await axios.get<ProjectWithHistoryResponse[]>(url);
    return response.data;
  } catch (err) {
    const error = err as Error | AxiosError;
    if (!axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error(`Error in 'url(${url})': ${error.message}`);
  }
};

// ProjectHistory

export interface ProjectHistoryResponse {
  id: number;
  startDate: string;
  endDate: string | null;
  expectedEndDate: string | null;
  utilizationRate: number | null;
  salesContractCompany: string | null;
  purchaseContractCompany: string | null;
  contractType: number | null;
  sales: number;
  cost: number | null;
  createdAt?: Date;
  updateAt?: Date;
  projectId: number;
  engineerId: number;
  project?: ProjectResponse;
  engineer?: EngineerResponse;
}
export const getProjectHistory = async (projectHistoryId: string): Promise<ProjectHistoryResponse> => {
  const url = `${baseUrl}/project/history/${projectHistoryId}`;
  try {
    const response = await axios.get<ProjectHistoryResponse>(url);
    return response.data;
  } catch (err) {
    const error = err as Error | AxiosError;
    if (!axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error(`Error in 'url(${url})': ${error.message}`);
  }
};

export interface ProjectHistoryGroupBy {
  _sum: {
    sales: number;
    cost: number;
  };
  _avg: {
    cost: number;
  };
  projectId: number;
}

export const getProjectHistoryGroup = async (): Promise<ProjectHistoryGroupBy[]> => {
  const url = `${baseUrl}/project/history/group`;
  try {
    const response = await axios.get<ProjectHistoryGroupBy[]>(url);
    return response.data;
  } catch (err) {
    const error = err as Error | AxiosError;
    if (!axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error(`Error in 'url(${url})': ${error.message}`);
  }
};

export interface ProjectHistoryGroupByMonth {
  label: string;
  data: ProjectHistoryGroupBy[];
}
export const getProjectHistoryGroupMonth = async (): Promise<ProjectHistoryGroupByMonth[]> => {
  const url = `${baseUrl}/project/history/group/month`;
  try {
    const response = await axios.get<ProjectHistoryGroupByMonth[]>(url);
    return response.data;
  } catch (err) {
    const error = err as Error | AxiosError;
    if (!axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error(`Error in 'url(${url})': ${error.message}`);
  }
};

export interface ProjectHistoryPostInput {
  startDate: string | null;
  endDate: string | null;
  expectedEndDate: string | null;
  utilizationRate: number | null;
  salesContractCompany: string | null;
  purchaseContractCompany: string | null;
  contractType: number | null;
  sales: number | null;
  cost: number | null;
  projectId: number;
  engineerId: number;
}
export const createProjectHistory = async (projectHistoryInput: ProjectHistoryPostInput) => {
  const url = `${baseUrl}/project/history/create`;
  try {
    const response = await axios.post(url, projectHistoryInput);
    return;
  } catch (err) {
    const error = err as Error | AxiosError;
    if (!axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error(`Error in 'url(${url})': ${error.message}`);
  }
};

export interface ProjectHistoryForm {
  id: number | null;
  startDate: string | null;
  endDate: string | null;
  expectedEndDate: string | null;
  utilizationRate: number | null;
  salesContractCompany: string | null;
  purchaseContractCompany: string | null;
  contractType: number | null;
  sales: number | null;
  cost: number | null;
  projectId: number | null;
  engineerId: number | null;
}
export const updateProjectHistory = async (projectHistoryId: string, projectHistoryForm: ProjectHistoryForm) => {
  const url = `${baseUrl}/project/history/update/${projectHistoryId}`;
  try {
    const response = await axios.post(url, projectHistoryForm);
    return;
  } catch (err) {
    const error = err as Error | AxiosError;
    if (!axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error(`Error in 'url(${url})': ${error.message}`);
  }
};
