// src/components/Comments/CommentsTab.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete, Refresh, History, Close } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { commentService } from '../../service/commentService';

const CommentsTab = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [totalRows, setTotalRows] = useState(0);
  const [selectedComment, setSelectedComment] = useState(null);
  const [auditDialogOpen, setAuditDialogOpen] = useState(false);

  const fetchComments = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      setError(null);
      const response = await commentService.getComments(page, limit);
      
      // Transform the API data to match the DataGrid expected format
      const transformedComments = response.data?.map(comment => ({
        id: comment.comment_unique_id,
        author: comment.user_name,
        content: comment.comments,
        timestamp: comment.comments_added_date,
        workflowId: comment.worklfow_unique_id,
        workflowName: comment.work_flow_name,
        projectNumber: comment.ugenprojectnumber,
        recordNumber: comment.record_no,
        processName: comment.bp_name,
        processType: comment.bp_type,
        round: comment.round,
        version: comment.comment_version,
        status: comment.workflow_current,
        audit_log: comment.audit_log || [],
        raw: comment // Keep original data for detailed view
      })) || [];

      setComments(transformedComments);
      setTotalRows(response.pagination?.total || response.data?.length || 0);
    } catch (err) {
      setError('Failed to fetch comments. Please try again.');
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(paginationModel.page + 1, paginationModel.pageSize);
  }, [paginationModel]);

  const handleRefresh = () => {
    fetchComments(paginationModel.page + 1, paginationModel.pageSize);
  };

  const handleRowClick = (params) => {
    setSelectedComment(params.row);
    setAuditDialogOpen(true);
  };

  const handleCloseAuditDialog = () => {
    setAuditDialogOpen(false);
    setSelectedComment(null);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved':
      case 'complete':
      case 'completed':
        return 'success';
      case 'active':
      case 'in progress':
      case 'pending':
        return 'primary';
      case 'review':
      case 'testing':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getInitials = (name) => {
    if (!name) return 'N/A';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const truncateText = (text, maxLength = 80) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      // Handle various date formats
      const date = new Date(dateString.replace(' ', 'T'));
      return date.toLocaleString();
    } catch {
      return dateString;
    }
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'author',
      headerName: 'Author',
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              fontSize: '0.75rem',
              bgcolor: 'primary.main',
            }}
          >
            {getInitials(params.value)}
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {params.value || 'N/A'}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'content',
      headerName: 'Content',
      flex: 1,
      minWidth: 250,
      renderCell: (params) => (
        <Tooltip title={params.value || ''} arrow>
          <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
            {truncateText(params.value)}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'projectNumber',
      headerName: 'Project Number',
      width: 120,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Chip
          label={params.value || 'N/A'}
          size="small"
          variant="outlined"
          color="info"
          sx={{ fontWeight: 500 }}
        />
      ),
    },
    {
      field: 'workflowName',
      headerName: 'Workflow Name',
      width: 140,
      renderCell: (params) => (
        <Tooltip title={params.value || 'N/A'} arrow>
          <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
            {truncateText(params.value, 20)}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'timestamp',
      headerName: 'Date',
      width: 140,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
          {formatDate(params.value)}
        </Typography>
      ),
    }
    
  ];

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert 
          severity="error" 
          action={
            <IconButton color="inherit" size="small" onClick={handleRefresh}>
              <Refresh />
            </IconButton>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
              Comments Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              View and manage all comments and feedback. Click on any row to view audit history.
            </Typography>
          </Box>
          <Tooltip title="Refresh Data">
            <IconButton onClick={handleRefresh} disabled={loading}>
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Data Grid */}
        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={comments}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rowCount={totalRows}
            paginationMode="server"
            pageSizeOptions={[5, 10, 25]}
            loading={loading}
            disableRowSelectionOnClick
            onRowClick={handleRowClick}
            getRowHeight={() => 'auto'}
            sx={{
              border: 'none',
              cursor: 'pointer',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'grey.50',
                borderRadius: 0,
                fontSize: '0.875rem',
                fontWeight: 600,
              },
              '& .MuiDataGrid-cell': {
                borderColor: 'grey.200',
                fontSize: '0.875rem',
                py: 1,
              },
              '& .MuiDataGrid-row': {
                '&:hover': {
                  backgroundColor: 'action.hover',
                  cursor: 'pointer',
                },
              },
              '& .MuiDataGrid-footerContainer': {
                borderColor: 'grey.200',
                backgroundColor: 'grey.50',
              },
              '& .MuiDataGrid-overlay': {
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              },
            }}
            slots={{
              loadingOverlay: () => (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <CircularProgress />
                </Box>
              ),
            }}
          />
        </Box>

        {/* Summary Info */}
        <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Chip
            label={`Total Comments: ${totalRows}`}
            variant="outlined"
            color="primary"
            size="small"
          />
          <Chip
            label={`Showing: ${comments.length}`}
            variant="outlined"
            color="secondary"
            size="small"
          />
        </Box>
      </Box>

      {/* Audit Log Dialog */}
      <Dialog
        open={auditDialogOpen}
        onClose={handleCloseAuditDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { minHeight: '500px' }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 1
        }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Comment Details & Audit Log
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedComment?.projectNumber} - {selectedComment?.recordNumber}
            </Typography>
          </Box>
          <IconButton onClick={handleCloseAuditDialog}>
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent dividers>
          {selectedComment && (
            <Box sx={{ pb: 2 }}>
              {/* Comment Details */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                    Current Comment Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Author:</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                        {selectedComment.author}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Status:</Typography>
                      <Chip 
                        label={selectedComment.status} 
                        color={getStatusColor(selectedComment.status)} 
                        size="small" 
                        sx={{ mb: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Workflow:</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                        {selectedComment.workflowName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Process:</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                        {selectedComment.processName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">Content:</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                        {selectedComment.content}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary">Round:</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {selectedComment.round || 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary">Version:</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {selectedComment.version || 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary">Date:</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {formatDate(selectedComment.timestamp)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Audit Log */}
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                Audit History
              </Typography>
              
              {selectedComment.audit_log && selectedComment.audit_log.length > 0 ? (
                <Stack spacing={2}>
                  {selectedComment.audit_log.map((audit, index) => (
                    <Card key={index} variant="outlined">
                      <CardContent sx={{ pb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar
                              sx={{
                                width: 24,
                                height: 24,
                                fontSize: '0.7rem',
                                bgcolor: 'secondary.main',
                              }}
                            >
                              {getInitials(audit.user_name)}
                            </Avatar>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {audit.user_name}
                            </Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            Version {audit.comment_version} • {formatDate(audit.comments_added_date)}
                          </Typography>
                        </Box>
                        
                        <Typography variant="body2" sx={{ mb: 2, pl: 4 }}>
                          {audit.comments}
                        </Typography>
                        
                        <Box sx={{ pl: 4 }}>
                          <Grid container spacing={1}>
                            <Grid item xs={6} sm={3}>
                              <Typography variant="caption" color="text.secondary">Workflow:</Typography>
                              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                {audit.workflow_current}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Typography variant="caption" color="text.secondary">Process:</Typography>
                              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                {audit.bp_name}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Typography variant="caption" color="text.secondary">Round:</Typography>
                              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                {audit.round}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Typography variant="caption" color="text.secondary">Record:</Typography>
                              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                {audit.record_no}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              ) : (
                <Alert severity="info">
                  No audit history available for this comment.
                </Alert>
              )}
            </Box>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseAuditDialog} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default CommentsTab;