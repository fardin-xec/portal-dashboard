// src/components/Tabs/TabsComponent.jsx
import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper, Typography, Avatar } from '@mui/material';
import { Assignment, Comment, Business } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import WorkflowsTab from '../Workflows/WorkflowsTab';
import CommentsTab from '../Comments/CommentsTab';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const TabsComponent = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header with Logo and Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 3,
          gap: 2 
        }}>
          {/* Company Logo */}
          <Box sx={{ position: 'relative' }}>
            <Box
              component="img"
              src="/ashghal.png" // Corrected path from public folder
              alt="Company Logo"
              sx={{
                height: 100,
                width: 100,
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                display: 'block',
              }}
              onError={(e) => {
                // Hide the image and show fallback
                e.target.style.display = 'none';
                const fallback = e.target.nextElementSibling;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            
            {/* Fallback Avatar */}
            <Avatar
              className="fallback-avatar"
              sx={{
                height: 80,
                width: 80,
                backgroundColor: 'rgba(139, 74, 156, 0.1)',
                border: '2px solid rgba(139, 74, 156, 0.2)',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                display: 'none', // Initially hidden
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            >
              <Business sx={{ fontSize: 40, color: '#9e1b5cff' }} />
            </Avatar>
          </Box>

          {/* Portal Management Title */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 600, 
                mb: 0.5,
                color: 'text.primary',
                letterSpacing: '-0.5px'
              }}
            >
              Portal Management
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ fontSize: '1.1rem' }}
            >
              Manage your workflows and comments efficiently
            </Typography>
          </Box>
        </Box>
      </motion.div>

      {/* Tabs */}
      <Paper
        elevation={0}
        sx={{
          background: 'white',
          borderRadius: 3,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="portal tabs"
            sx={{
              px: 2,
              '& .MuiTab-root': {
                minHeight: 60,
                fontSize: '1rem',
                fontWeight: 500,
                textTransform: 'none',
                mx: 1,
              },
              '& .Mui-selected': {
                color: 'primary.main',
                fontWeight: 600,
              },
            }}
          >
            <Tab
              icon={<Assignment sx={{ mb: 0.5 }} />}
              label="Workflows"
              iconPosition="start"
              {...a11yProps(0)}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
              }}
            />
            <Tab
              icon={<Comment sx={{ mb: 0.5 }} />}
              label="Comments"
              iconPosition="start"
              {...a11yProps(1)}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
              }}
            />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <TabPanel value={value} index={0}>
            <motion.div
              key="workflows"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <WorkflowsTab />
            </motion.div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <motion.div
              key="comments"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <CommentsTab />
            </motion.div>
          </TabPanel>
        </AnimatePresence>
      </Paper>
    </Box>
  );
};

export default TabsComponent;