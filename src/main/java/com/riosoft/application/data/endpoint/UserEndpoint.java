package com.riosoft.application.data.endpoint;

import java.util.Optional;

import com.riosoft.application.data.entity.User;
import com.riosoft.application.security.AuthenticatedUser;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.fusion.Endpoint;

import org.springframework.beans.factory.annotation.Autowired;

@Endpoint
@AnonymousAllowed
public class UserEndpoint {

    @Autowired
    private AuthenticatedUser authenticatedUser;

    public Optional<User> getAuthenticatedUser() {
        return authenticatedUser.get();
    }
}
