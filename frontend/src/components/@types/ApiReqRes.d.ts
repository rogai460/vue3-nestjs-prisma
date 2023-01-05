export interface ProjectResponse {
  id: string;
  projectNameMask: string;
  projectName: string;
  startDate: string;
  endDate: string | null;
  endUser: string;
}

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
  project?: Project;
  engineer?: Engineer;
}

export interface ProjectHistoryPostUpdate {
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

interface ProjectHistoryPostInput {
  startDate: string;
  endDate?: string | null;
  expectedEndDate?: string | null;
  utilizationRate?: number | null;
  salesContractCompany?: string | null;
  purchaseContractCompany?: string | null;
  contractType?: number | null;
  sales: number;
  cost?: number | null;
  projectId: number;
  engineerId: number;
}
