package work.sehippocampus.app.security;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import java.text.ParseException;
import java.util.Date;

public class JWTUtils {

    private final Long validSeconds;
    private final String key;

    public JWTUtils(String key, Long validSeconds) throws KeyLengthException {
        this.validSeconds = validSeconds;
        this.key = key;
    }

    public String encode(String sub) {
        if (sub == null || sub.equals("")) {
            return null;
        }
        JWSSigner singer = null;
        try {
            singer = new MACSigner(key);
            JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(sub)
                .issueTime(new Date())
                .expirationTime(new Date(new Date().getTime() + validSeconds * 1000))
                .build();
            SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), claimsSet);
            signedJWT.sign(singer);
            return signedJWT.serialize();
        } catch (JOSEException e) {
            return null;
        }
    }

    public String resolveToken(String bearerToken) {
        if (bearerToken == null ||  !bearerToken.startsWith("Bearer ")) {
            return null;
        }
        return bearerToken.substring("Bearer ".length());
    }

    public boolean validateToken(String jwt) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(jwt);

            JWSVerifier verifier = new MACVerifier(key);

            return signedJWT.verify(verifier)
                    || new Date().before(signedJWT.getJWTClaimsSet().getExpirationTime());
        } catch (ParseException | JOSEException e) {
            return false;
        }
    }

    public String getSub(String jwt) {
        SignedJWT signedJWT = null;
        try {
            signedJWT = SignedJWT.parse(jwt);
            return signedJWT.getJWTClaimsSet().getSubject();
        } catch (ParseException e) {
            return null;
        }
    }
}
