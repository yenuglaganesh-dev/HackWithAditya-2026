package com.bhashabridge.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;
import java.util.Map;

public class ChatDto {

    public static class Request {
        @NotBlank(message = "Session ID is required")
        private String session_id;

        @NotBlank(message = "Message text cannot be empty")
        private String message;

        private String language = "auto";
        private boolean enable_rag = true;
        private boolean enable_research = false;

        public String getSession_id() { return session_id; }
        public void setSession_id(String session_id) { this.session_id = session_id; }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }

        public String getLanguage() { return language; }
        public void setLanguage(String language) { this.language = language; }

        public boolean isEnable_rag() { return enable_rag; }
        public void setEnable_rag(boolean enable_rag) { this.enable_rag = enable_rag; }

        public boolean isEnable_research() { return enable_research; }
        public void setEnable_research(boolean enable_research) { this.enable_research = enable_research; }
    }

    public static class Response {
        private String session_id;
        private String response;
        private String language;
        private String detected_language;
        private String model_used;
        private List<String> agent_trace;
        private List<Map<String, Object>> sources;
        private boolean verified;
        private String verification_notes;
        private boolean audio_available;

        public String getSession_id() { return session_id; }
        public void setSession_id(String session_id) { this.session_id = session_id; }

        public String getResponse() { return response; }
        public void setResponse(String response) { this.response = response; }

        public String getLanguage() { return language; }
        public void setLanguage(String language) { this.language = language; }

        public String getDetected_language() { return detected_language; }
        public void setDetected_language(String detected_language) { this.detected_language = detected_language; }

        public String getModel_used() { return model_used; }
        public void setModel_used(String model_used) { this.model_used = model_used; }

        public List<String> getAgent_trace() { return agent_trace; }
        public void setAgent_trace(List<String> agent_trace) { this.agent_trace = agent_trace; }

        public List<Map<String, Object>> getSources() { return sources; }
        public void setSources(List<Map<String, Object>> sources) { this.sources = sources; }

        public boolean isVerified() { return verified; }
        public void setVerified(boolean verified) { this.verified = verified; }

        public String getVerification_notes() { return verification_notes; }
        public void setVerification_notes(String verification_notes) { this.verification_notes = verification_notes; }

        public boolean isAudio_available() { return audio_available; }
        public void setAudio_available(boolean audio_available) { this.audio_available = audio_available; }
    }
}
