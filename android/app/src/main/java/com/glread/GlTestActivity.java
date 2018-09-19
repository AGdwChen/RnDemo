package com.glread;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

public class GlTestActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_gl_test);
        setTitle("原生activity");
    }

}
