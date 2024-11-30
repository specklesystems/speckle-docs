# Troubleshooting Automations  

Automations may fail for three key reasons:

### 1. By Design  (**Failed**)
The function logic completes successfully but flags the automation as failed due to data not meeting specified checks or analyses.  
**Solution:** Review the automation run reports in the UI.

### 2. By Code Error  (**Exception**)
The function exits prematurely due to errors in the code logic. Speckle Automate flags the automation run with **Exception**. 
**Solution:** Check the logs to identify and resolve the error.

### 3. By Platform Error  (**Exception**)
Failures caused by issues in the execution environment:  
- **Misconfigured Function Container**: Logs will reveal incorrect setup details.  
- **Insufficient Compute Resources**: Out-of-memory errors will appear in logs.  
- **External Factors**: Squirrels may have chewed through the wires!  
  **Solution:** Contact animal welfare to rehome the culprits.
