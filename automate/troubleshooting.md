# Troubleshooting

### Failed Automations

Automations may show a FAILED state for three categories of reasons:

- **By design**: a function successfully executes but marks the automation as Failed as part of its logic because the version data has failed the checks or analysis being run. — **Check the automation run reports in the UI**
- **By code error:** a function has exited unexpectedly early due to code logic errors. — **Check the logs to review the error message**
- **By platform error**: something in the platform has caused the execution to fail. This could be because:
    - The function container is incorrectly configured — **Check the logs to review the error message**
    - The available compute resource for the function container has run out of memory. — **Check the logs to review the error message**
    - Squirrels have eaten through the wires — **Call animal welfare and request a rehoming**.