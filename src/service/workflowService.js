// src/services/workflowService.js
import apiClient from './api';

// Mock data for development
const mockWorkflows = [
  { id: 1, title: 'Hardware Request', status: 'Pending', priority: 'High', assignee: 'John Doe', createdDate: '2024-01-15', dueDate: '2024-01-20' },
  { id: 2, title: 'Integration Service Request', status: 'In Progress', priority: 'Medium', assignee: 'Jane Smith', createdDate: '2024-01-14', dueDate: '2024-01-25' },
  { id: 3, title: 'New Employment Request', status: 'Completed', priority: 'High', assignee: 'Mike Johnson', createdDate: '2024-01-13', dueDate: '2024-01-18' },
  { id: 4, title: 'Folder Access Request', status: 'Pending', priority: 'Low', assignee: 'Sarah Wilson', createdDate: '2024-01-12', dueDate: '2024-01-22' },
  { id: 5, title: 'Software Request', status: 'In Progress', priority: 'High', assignee: 'David Brown', createdDate: '2024-01-11', dueDate: '2024-01-21' },
  { id: 6, title: 'Server Access Request', status: 'Pending', priority: 'Medium', assignee: 'Lisa Garcia', createdDate: '2024-01-10', dueDate: '2024-01-24' },
  { id: 7, title: 'Digital Signature Request', status: 'Completed', priority: 'Low', assignee: 'Tom Miller', createdDate: '2024-01-09', dueDate: '2024-01-19' },
  { id: 8, title: 'Storage Request', status: 'In Progress', priority: 'Medium', assignee: 'Anna Davis', createdDate: '2024-01-08', dueDate: '2024-01-23' },
  { id: 9, title: 'Communication Services', status: 'Pending', priority: 'High', assignee: 'Chris Wilson', createdDate: '2024-01-07', dueDate: '2024-01-17' },
  { id: 10, title: 'International Mobile Request', status: 'Completed', priority: 'Low', assignee: 'Emma Taylor', createdDate: '2024-01-06', dueDate: '2024-01-16' },
  { id: 11, title: 'VPN Access Request', status: 'Pending', priority: 'Medium', assignee: 'Ryan Anderson', createdDate: '2024-01-05', dueDate: '2024-01-26' },
  { id: 12, title: 'Database Access Request', status: 'In Progress', priority: 'High', assignee: 'Maria Rodriguez', createdDate: '2024-01-04', dueDate: '2024-01-14' },
];

export const workflowService = {
  async getWorkflows(page = 1, limit = 10) {
    try {
      // Try to fetch from real API first
      const response = await apiClient.get(`/workflows?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      // Fallback to mock data
      console.warn('API not available, using mock data');
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedData = mockWorkflows.slice(start, end);
      
      // Simulate API response structure
      return {
        data: paginatedData,
        total: mockWorkflows.length,
        page,
        limit,
        totalPages: Math.ceil(mockWorkflows.length / limit),
      };
    }
  },

  async getWorkflowById(id) {
    try {
      const response = await apiClient.get(`/workflows/${id}`);
      return response.data;
    } catch (error) {
      // Fallback to mock data
      const workflow = mockWorkflows.find(w => w.id === parseInt(id));
      return workflow;
    }
  },
};

