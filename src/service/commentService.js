// src/services/commentService.js
import apiClient from './api';

// Mock data for development - matching API response structure
const mockApiResponse = {
  "success": true,
  "code": 200,
  "message": "Operation completed successfully",
  "traceId": "4e15b3d7-62ae-4e92-a1c7-0bf970dc5592",
  "timestamp": "2025-07-27T10:15:42Z",
  "data": [
    {
      "process_id": 1231,
      "comments": "Please review the hardware specifications for the new project.",
      "user_name": "John Doe",
      "workflow_current": "Consultant to prepare data",
      "task_node_id": 1231,
      "bp_name": "Letters - New",
      "round": "data",
      "comment_unique_id": 1234,
      "user_id": 1234,
      "proaject_id": 1231,
      "worklfow_unique_id": 1231,
      "ugenprojectnumber": "P-0001",
      "record_no": "Let-0001",
      "bp_type": "uxet",
      "source_id": 1231,
      "comments_added_date": "2024-01-15 09:30",
      "work_flow_name": "Migration WF",
      "comment_version": "0.2",
      "audit_log": [
        {
          "process_id": 1231,
          "comments": "Please review the hardware specifications for the new project.",
          "user_name": "John Doe",
          "workflow_current": "Consultant to prepare data",
          "task_node_id": 1231,
          "bp_name": "Letters - New",
          "round": "data",
          "comment_unique_id": 1234,
          "user_id": 1234,
          "project_id": 1231,
          "worklfow_unique_id": 1231,
          "ugenprojectnumber": "P-0001",
          "record_no": "Let-0001",
          "bp_type": "uxet",
          "source_id": 1231,
          "comments_added_date": "2024-01-15 09:30",
          "work_flow_name": "Migration WF",
          "comment_version": "0.1"
        }
      ]
    },
    {
      "process_id": 1232,
      "comments": "The integration testing has been completed successfully.",
      "user_name": "Jane Smith",
      "workflow_current": "Testing Phase",
      "task_node_id": 1232,
      "bp_name": "Integration - Active",
      "round": "testing",
      "comment_unique_id": 1235,
      "user_id": 1235,
      "proaject_id": 1232,
      "worklfow_unique_id": 1232,
      "ugenprojectnumber": "P-0002",
      "record_no": "Int-0001",
      "bp_type": "test",
      "source_id": 1232,
      "comments_added_date": "2024-01-15 10:15",
      "work_flow_name": "Testing WF",
      "comment_version": "0.2",
      "audit_log": [
        {
          "process_id": 1232,
          "comments": "The integration testing has been completed successfully.",
          "user_name": "Jane Smith",
          "workflow_current": "Testing Phase",
          "task_node_id": 1232,
          "bp_name": "Integration - Active",
          "round": "testing",
          "comment_unique_id": 1235,
          "user_id": 1235,
          "project_id": 1232,
          "worklfow_unique_id": 1232,
          "ugenprojectnumber": "P-0002",
          "record_no": "Int-0001",
          "bp_type": "test",
          "source_id": 1232,
          "comments_added_date": "2024-01-15 10:15",
          "work_flow_name": "Testing WF",
          "comment_version": "0.1"
        }
      ]
    },
    {
      "process_id": 1233,
      "comments": "New employee onboarding documentation is ready for review.",
      "user_name": "Mike Johnson",
      "workflow_current": "Documentation Review",
      "task_node_id": 1233,
      "bp_name": "Onboarding - Complete",
      "round": "review",
      "comment_unique_id": 1236,
      "user_id": 1236,
      "proaject_id": 1233,
      "worklfow_unique_id": 1233,
      "ugenprojectnumber": "P-0003",
      "record_no": "Onb-0001",
      "bp_type": "doc",
      "source_id": 1233,
      "comments_added_date": "2024-01-15 11:00",
      "work_flow_name": "Onboarding WF",
      "comment_version": "0.3",
      "audit_log": [
        {
          "process_id": 1233,
          "comments": "New employee onboarding documentation is ready for review.",
          "user_name": "Mike Johnson",
          "workflow_current": "Documentation Review",
          "task_node_id": 1233,
          "bp_name": "Onboarding - Complete",
          "round": "review",
          "comment_unique_id": 1236,
          "user_id": 1236,
          "project_id": 1233,
          "worklfow_unique_id": 1233,
          "ugenprojectnumber": "P-0003",
          "record_no": "Onb-0001",
          "bp_type": "doc",
          "source_id": 1233,
          "comments_added_date": "2024-01-15 11:00",
          "work_flow_name": "Onboarding WF",
          "comment_version": "0.2"
        },
        {
          "process_id": 1233,
          "comments": "New employee onboarding documentation is ready for review.",
          "user_name": "Mike Johnson",
          "workflow_current": "Documentation Review",
          "task_node_id": 1233,
          "bp_name": "Onboarding - Complete",
          "round": "review",
          "comment_unique_id": 1236,
          "user_id": 1236,
          "project_id": 1233,
          "worklfow_unique_id": 1233,
          "ugenprojectnumber": "P-0003",
          "record_no": "Onb-0001",
          "bp_type": "doc",
          "source_id": 1233,
          "comments_added_date": "2024-01-15 11:00",
          "work_flow_name": "Onboarding WF",
          "comment_version": "0.1"
        }
      ]
    },
    {
      "process_id": 1234,
      "comments": "Folder permissions have been updated according to the request.",
      "user_name": "Sarah Wilson",
      "workflow_current": "Access Management",
      "task_node_id": 1234,
      "bp_name": "Permissions - Updated",
      "round": "config",
      "comment_unique_id": 1237,
      "user_id": 1237,
      "proaject_id": 1234,
      "worklfow_unique_id": 1234,
      "ugenprojectnumber": "P-0004",
      "record_no": "Perm-0001",
      "bp_type": "access",
      "source_id": 1234,
      "comments_added_date": "2024-01-15 13:45",
      "work_flow_name": "Access WF",
      "comment_version": "0.4",
      "audit_log": [
        {
          "process_id": 1234,
          "comments": "Folder permissions have been updated according to the request.",
          "user_name": "Sarah Wilson",
          "workflow_current": "Access Management",
          "task_node_id": 1234,
          "bp_name": "Permissions - Updated",
          "round": "config",
          "comment_unique_id": 1237,
          "user_id": 1237,
          "project_id": 1234,
          "worklfow_unique_id": 1234,
          "ugenprojectnumber": "P-0004",
          "record_no": "Perm-0001",
          "bp_type": "access",
          "source_id": 1234,
          "comments_added_date": "2024-01-15 13:45",
          "work_flow_name": "Access WF",
          "comment_version": "0.3"
        },
         {
          "process_id": 1234,
          "comments": "Folder permissions have been updated according to the request.",
          "user_name": "Sarah Wilson",
          "workflow_current": "Access Management",
          "task_node_id": 1234,
          "bp_name": "Permissions - Updated",
          "round": "config",
          "comment_unique_id": 1237,
          "user_id": 1237,
          "project_id": 1234,
          "worklfow_unique_id": 1234,
          "ugenprojectnumber": "P-0004",
          "record_no": "Perm-0001",
          "bp_type": "access",
          "source_id": 1234,
          "comments_added_date": "2024-01-15 13:45",
          "work_flow_name": "Access WF",
          "comment_version": "0.2"
        },
         {
          "process_id": 1234,
          "comments": "Folder permissions have been updated according to the request.",
          "user_name": "Sarah Wilson",
          "workflow_current": "Access Management",
          "task_node_id": 1234,
          "bp_name": "Permissions - Updated",
          "round": "config",
          "comment_unique_id": 1237,
          "user_id": 1237,
          "project_id": 1234,
          "worklfow_unique_id": 1234,
          "ugenprojectnumber": "P-0004",
          "record_no": "Perm-0001",
          "bp_type": "access",
          "source_id": 1234,
          "comments_added_date": "2024-01-15 13:45",
          "work_flow_name": "Access WF",
          "comment_version": "0.1"
        }
      ]
    },
    {
      "process_id": 1235,
      "comments": "Software license verification is in progress.",
      "user_name": "David Brown",
      "workflow_current": "License Verification",
      "task_node_id": 1235,
      "bp_name": "License - Pending",
      "round": "verification",
      "comment_unique_id": 1238,
      "user_id": 1238,
      "proaject_id": 1235,
      "worklfow_unique_id": 1235,
      "ugenprojectnumber": "P-0005",
      "record_no": "Lic-0001",
      "bp_type": "license",
      "source_id": 1235,
      "comments_added_date": "2024-01-15 14:20",
      "work_flow_name": "License WF",
      "comment_version": "0.2",
      "audit_log": [
        {
          "process_id": 1235,
          "comments": "Software license verification is in progress.",
          "user_name": "David Brown",
          "workflow_current": "License Verification",
          "task_node_id": 1235,
          "bp_name": "License - Pending",
          "round": "verification",
          "comment_unique_id": 1238,
          "user_id": 1238,
          "project_id": 1235,
          "worklfow_unique_id": 1235,
          "ugenprojectnumber": "P-0005",
          "record_no": "Lic-0001",
          "bp_type": "license",
          "source_id": 1235,
          "comments_added_date": "2024-01-15 14:20",
          "work_flow_name": "License WF",
          "comment_version": "0.1"
        }
      ]
    },
    {
      "process_id": 1236,
      "comments": "Server maintenance scheduled for next weekend.",
      "user_name": "Lisa Garcia",
      "workflow_current": "Maintenance Planning",
      "task_node_id": 1236,
      "bp_name": "Maintenance - Scheduled",
      "round": "planning",
      "comment_unique_id": 1239,
      "user_id": 1239,
      "proaject_id": 1236,
      "worklfow_unique_id": 1236,
      "ugenprojectnumber": "P-0006",
      "record_no": "Mnt-0001",
      "bp_type": "maintenance",
      "source_id": 1236,
      "comments_added_date": "2024-01-15 15:30",
      "work_flow_name": "Maintenance WF",
      "comment_version": "0.2",
      "audit_log": [
        {
          "process_id": 1236,
          "comments": "Server maintenance scheduled for next weekend.",
          "user_name": "Lisa Garcia",
          "workflow_current": "Maintenance Planning",
          "task_node_id": 1236,
          "bp_name": "Maintenance - Scheduled",
          "round": "planning",
          "comment_unique_id": 1239,
          "user_id": 1239,
          "project_id": 1236,
          "worklfow_unique_id": 1236,
          "ugenprojectnumber": "P-0006",
          "record_no": "Mnt-0001",
          "bp_type": "maintenance",
          "source_id": 1236,
          "comments_added_date": "2024-01-15 15:30",
          "work_flow_name": "Maintenance WF",
          "comment_version": "0.1"
        }
      ]
    }
  ]
};

export const commentService = {
  async getComments(page = 1, limit = 10) {
    try {
      // Try to fetch from real API first
      const response = await apiClient.get(`/comments?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      // Fallback to mock data
      console.warn('API not available, using mock data');
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedData = mockApiResponse.data.slice(start, end);
      
      // Simulate API response structure
      return {
        ...mockApiResponse,
        data: paginatedData,
        pagination: {
          total: mockApiResponse.data.length,
          page,
          limit,
          totalPages: Math.ceil(mockApiResponse.data.length / limit),
        }
      };
    }
  },

  async getCommentById(id) {
    try {
      const response = await apiClient.get(`/comments/${id}`);
      return response.data;
    } catch (error) {
      // Fallback to mock data
      const comment = mockApiResponse.data.find(c => c.comment_unique_id === parseInt(id));
      if (comment) {
        return {
          ...mockApiResponse,
          data: [comment]
        };
      }
      return null;
    }
  },

  // async addComment(commentData) {
  //   try {
  //     const response = await apiClient.post('/comments', commentData);
  //     return response.data;
  //   } catch (error) {
  //     // Fallback to mock response
  //     console.warn('API not available, simulating comment addition');
  //     const newComment = {
  //       process_id: Math.floor(Math.random() * 10000),
  //       comments: commentData.comments,
  //       user_name: commentData.user_name || 'Anonymous',
  //       workflow_current: commentData.workflow_current || 'Pending',
  //       task_node_id: Math.floor(Math.random() * 10000),
  //       bp_name: commentData.bp_name || 'New Process',
  //       round: commentData.round || 'initial',
  //       comment_unique_id: Math.floor(Math.random() * 10000),
  //       user_id: commentData.user_id || Math.floor(Math.random() * 10000),
  //       proaject_id: commentData.proaject_id || Math.floor(Math.random() * 10000),
  //       worklfow_unique_id: Math.floor(Math.random() * 10000),
  //       ugenprojectnumber: `P-${String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0')}`,
  //       record_no: `Comment-${String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0')}`,
  //       bp_type: commentData.bp_type || 'general',
  //       source_id: Math.floor(Math.random() * 10000),
  //       comments_added_date: new Date().toISOString().slice(0, 16).replace('T', ' '),
  //       work_flow_name: commentData.work_flow_name || 'General WF',
  //       comment_version: '1.0',
  //       audit_log: []
  //     };

  //     return {
  //       success: true,
  //       code: 201,
  //       message: "Comment added successfully",
  //       traceId: `mock-${Date.now()}`,
  //       timestamp: new Date().toISOString(),
  //       data: [newComment]
  //     };
  //   }
  // },

  // async updateComment(id, commentData) {
  //   try {
  //     const response = await apiClient.put(`/comments/${id}`, commentData);
  //     return response.data;
  //   } catch (error) {
  //     // Fallback to mock response
  //     console.warn('API not available, simulating comment update');
  //     return {
  //       success: true,
  //       code: 200,
  //       message: "Comment updated successfully",
  //       traceId: `mock-update-${Date.now()}`,
  //       timestamp: new Date().toISOString(),
  //       data: [{ ...commentData, comment_unique_id: parseInt(id) }]
  //     };
  //   }
  // },

  // async deleteComment(id) {
  //   try {
  //     const response = await apiClient.delete(`/comments/${id}`);
  //     return response.data;
  //   } catch (error) {
  //     // Fallback to mock response
  //     console.warn('API not available, simulating comment deletion');
  //     return {
  //       success: true,
  //       code: 200,
  //       message: "Comment deleted successfully",
  //       traceId: `mock-delete-${Date.now()}`,
  //       timestamp: new Date().toISOString(),
  //       data: []
  //     };
  //   }
  // }
};