# Function Specification

The Function specification defines an Application Programming Interface (API) to which a Function must comply in order to be used with Automate.

The specification is designed to be agnostic of the type or purpose of software packaged into a Function.

## Definitions

Several terms are used with frequency in this document and require definition:

- **Speckle**: Speckle is a platform for exchanging data between different software applications, allowing users to collaborate and communicate AEC-related data.
- **AEC**: Architecture, Engineering, and Construction industry.
- **Automate**: Automate is a platform which allows users to run Functions.
- **Automation**: An Automation is a configuration of a Function which is ready to be run on events from changes in a Speckle Model, or on demand.
- **Function**: A Function is a small piece of packaged software which performs a specific task. Functions are the building blocks of Automate.
- **Image**: An Image is a standardised method of packaging and distributing content. An Image is defined by the [Open Container Initiative Image Format Specification](https://github.com/opencontainers/image-spec/blob/main/spec.md).
- **OCI**: [Open Container Initiative](https://opencontainers.org/). The OCI is a lightweight, open governance structure (project), formed under the auspices of the [Linux Foundation](https://www.linuxfoundation.org/), for the express purpose of creating open industry standards around container formats and runtime.

## Notational Conventions

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" are to be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119) (Bradner, S., "Key words for use in RFCs to Indicate Requirement Levels", BCP 14, RFC 2119, March 1997).

The key words "unspecified", "undefined", and "implementation-defined" are to be interpreted as described in the [rationale for the C99 standard][c99-unspecified].

An implementation is not compliant if it fails to satisfy one or more of the MUST, MUST NOT, REQUIRED, SHALL, or SHALL NOT requirements for the protocols it implements.
An implementation is compliant if it satisfies all the MUST, MUST NOT, REQUIRED, SHALL, and SHALL NOT requirements for the protocols it implements.

## Specification

1. A Function MUST be packaged as an OCI Image, compliant with the [Open Container Initiative Image Format Specification](https://github.com/opencontainers/image-spec/blob/main/spec.md)

1. A Function MUST be able to be run in an environment compliant with the [Open Container Initiative Runtime Specification](https://github.com/opencontainers/runtime-spec/blob/main/spec.md).

1. A Function SHOULD NOT specify an `Entrypoint` in its OCI Image. If an `Entrypoint` is specified it will be ignored. Instead the `Entrypoint` should be provided to Automate as the first values of the Function Version command, which will be passed to the Function when it is run.

1. A Function SHOULD NOT specify a `Cmd` in its OCI Image. If a `Cmd` is specified it will be ignored. Instead, the `Cmd` should be provided to Automate as the Function Version command, which will pass it to the Function when it is run.

1. A Function SHOULD expect that the `args` provided as part of the `process` (see [OCI Runtime Specification](https://github.com/opencontainers/runtime-spec/blob/main/spec.md)) will be the Function Version command provided by the Function author to Automate, followed by three additional arguments in sequential order.

1. The first additional argument provided to `args` SHALL be metadata describing the Automation, the Run of the Automation, and the [Speckle Model](../user/concepts.md) and project which is linked to the Automation. The metdata SHALL be provided as a JSON string and follow the following [json schema](https://json-schema.org/):

    ```json
    {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "https://automate.speckle.systems/automationfunctionrunmetadata.schema.json",
      "title": "Automation Run Metadata",
      "description": "The metadata describing an Automation Function Run.",
      "type": "object",
      "properties": {
        "projectId": {
          "type": "string",
          "description": "The ID of the Speckle Project which contains the Speckle Model which is associated with the Automation."
        },
        "modelId": {
          "type": "string",
          "description": "The ID of the Speckle Model which is associated with the Automation. A change to this model may have caused the Automation to run."
        },
        "branchName": {
          "type": "string",
          "description": "The name of the Speckle Branch. 'Branch' is now known as 'Model' except in the Speckle API, where 'Branch' wording is retained to provide backwards compatibility and ensure ongoing stability of the API."
        },
        "versionId": {
          "type": "string",
          "description": "The version of the Speckle Model. This is the version which was created as a result of the change which triggered the Automation to run. Or, in the case of an Automation being manually triggered by a user, it is the current version of the Speckle Model."
        },
        "speckleServerUrl": {
          "type": "string",
          "description": "The URL of the Speckle Server which contains the Speckle Project and Speckle Model which is associated with the Automation."
        },
        "automationId": {
          "type": "string",
          "description": "The ID of the Automation which is being run."
        },
        "automationRevisionId": {
          "type": "string",
          "description": "The ID of the revision of the Automation which is being run."
        },
        "automationRunId": {
          "type": "string",
          "description": "The ID which defines the current run of the Automation. This is a unique ID which is generated for each run of an Automation."
        },
        "functionName": {
          "type": "string",
          "description": "The name of the Function which is being run."
        },
        "functionId": {
          "type": "string",
          "description": "A unique id of the Function which is being run. This includes a hyphen concatenated string containing the Automation ID, the Automation version ID, the Function Id, the Function Version ID, and a unique number which identifies this running instance within the context of the running Automation."
        },
        "functionLogo": {
          "type": "string",
          "description": "Base64 encoded string of the Function logo."
        }
      }
    }
    ```

1. The second additional argument SHALL be the Automate Inputs provided to the Automation by the Automation composer. The Automate Inputs are provided as a JSON string and follow the following [json schema](https://json-schema.org/). The schema for the additional properties SHALL be defined by the Function author, and MUST be provided to Automate at the time of creating a new version of a Function. The values MUST be defined by the Automation composer at the time of creating a new version of the Automation:

    ```json
    {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "https://automate.speckle.systems/automationfunctionruninputs.schema.json",
      "title": "Automation Run Inputs",
      "description": "The configuration values for a Function within an Automation.",
      "type": "object",
      "properties": {
        "additionalProperties": "true"
      }
    }
    ```

1. The third additional argument, and final argument value in the array of `args`, SHALL be a token for accessing the Speckle API. This Token SHALL be limited in scope to the Speckle Model which triggered the Function to run as part of an Automation. The token is a string.

1. A Function MUST expect to be run as a non-root [Posix-platform user](https://github.com/opencontainers/runtime-spec/blob/main/config.md).

1. A Function MUST expect to be run in a [Linux Process](https://github.com/opencontainers/runtime-spec/blob/main/config.md#process).

1. A Function MUST expect to be run with [Posix-process `rlimits` set](https://github.com/opencontainers/runtime-spec/blob/main/config.md#process).

1. A Function MUST expect to be run without any allowed Linux [Capabilities](http://man7.org/linux/man-pages/man7/capabilities.7.html) and without the ability to add new privileges. For example, a Function will not have the capability to bind to a port number less than 1024.

1. A Function MUST run on AMD 64-bit architecture.

1. A Function SHOULD NOT expect to accept incoming network connections from outside localhost network. Any incoming network connections will be blocked or ignored by the supporting infrastructure and not routed to the Function. A Function MAY make outbound network connections (within the limitations of Speckle's Terms of Service).

1. A Function MUST comply with Speckle's Terms of Service. Speckle reserve the right to remove or block any Function from its platform for any reason.
